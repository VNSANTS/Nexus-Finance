-- O trigger de proteção do perfil consulta private.is_admin() para JWTs
-- autenticados. A Edge Function usa service_role e deve ser aceita sem
-- ampliar a permissão de execução dessa função privada.
CREATE OR REPLACE FUNCTION public.proteger_campos_restritos_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

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
