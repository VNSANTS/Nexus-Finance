-- 013: Corrigir o controle de campos sensíveis de public.profiles.
-- A política antiga limitava role, mas não impedia o próprio usuário de
-- alterar status (inclusive desbloqueá-lo) e email diretamente pela API.
-- Não altera nem copia dados existentes. Reexecutável.
CREATE OR REPLACE FUNCTION public.proteger_campos_restritos_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  -- A service_role é confiável e não deve depender de EXECUTE em is_admin,
  -- que é restrita aos JWTs authenticated por desenho.
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  -- Com o token de um usuário comum, somente os campos editáveis pelo
  -- usuário podem mudar. Admins reais são verificados pelo banco.
  -- A função de admin foi movida para o schema private pela migração 20261023161332.
  -- Calls administrativos sem auth.uid continuam permitidos.
  IF auth.uid() IS NOT NULL AND NOT private.is_admin() THEN
    IF NEW.role IS DISTINCT FROM OLD.role
       OR NEW.status IS DISTINCT FROM OLD.status
       OR NEW.email IS DISTINCT FROM OLD.email
       OR NEW.id IS DISTINCT FROM OLD.id THEN
      RAISE EXCEPTION 'Não é permitido alterar campos administrativos do perfil.'
        USING ERRCODE = '42501';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_proteger_campos_restritos ON public.profiles;
CREATE TRIGGER profiles_proteger_campos_restritos
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.proteger_campos_restritos_profile();

-- Remover a subconsulta a profiles da própria policy evita possível
-- recursão de RLS. O trigger acima cuida das COLUNAS; a policy cuida
-- de QUAIS LINHAS o usuário pode editar.
DROP POLICY IF EXISTS "usuario_edita_proprio_perfil" ON public.profiles;
CREATE POLICY "usuario_edita_proprio_perfil"
  ON public.profiles FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- Teste manual obrigatório com JWT de usuário não-admin:
-- UPDATE profiles SET status='ativo' WHERE id=auth.uid() -> deve FALHAR;
-- UPDATE profiles SET role='admin' WHERE id=auth.uid() -> deve FALHAR;
-- UPDATE profiles SET nome='Teste' WHERE id=auth.uid() -> deve PASSAR;
-- a edição por admin e pelo serviço devem continuar funcionando.
