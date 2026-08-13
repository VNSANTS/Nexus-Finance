import type { Livro } from '@/types'

export const livroRandomWalkWallStreet: Livro =   {
    id: 'random-walk-wall-street',
    titulo: 'Um Passeio Aleatório por Wall Street',
    autor: 'Burton G. Malkiel',
    cor: '#06B6D4',
    categoria: 'educacao-financeira',
    paraQuem: 'Quem quer entender por que a gestão passiva costuma vencer a ativa antes de escolher entre fundos e ETFs',
    ideias: [
      'O mercado segue um "passeio aleatório": preços futuros não podem ser previstos de forma confiável a partir de padrões de preços passados — gráficos, por si só, não funcionam.',
      'Informação pública já está precificada: se a notícia já apareceu no jornal, o mercado já reagiu a ela, o que limita a vantagem da análise baseada só em dados públicos.',
      'A maioria dos fundos ativos perde para o índice no longo prazo, e quem supera em um período tende a ter dificuldade em repetir a performance no seguinte.',
      'Taxas de administração corroem patrimônio de forma silenciosa: uma diferença de 1% ao ano pode significar bem menos patrimônio acumulado ao final de décadas.',
      'Diversificação é o único "almoço grátis" da teoria de investimentos — reduz risco sem necessariamente reduzir o retorno esperado da carteira.',
    ],
    resumoCompleto: [
      {
        secao: 'Fundações Sólidas versus Castelos no Ar',
        texto: 'Malkiel contrasta duas escolas de análise: a que avalia o valor real de uma empresa (fundações sólidas) e a que tenta prever o comportamento da multidão de investidores (castelos no ar). Ele usa bolhas históricas para mostrar como o preço pode se desconectar do valor por longos períodos, movido puramente por psicologia coletiva.',
      },
      {
        secao: 'A Teoria do Passeio Aleatório',
        texto: 'A tese central do livro é que os movimentos de preço de curto prazo se comportam de forma próxima a um passeio aleatório, tornando a análise técnica (baseada em padrões gráficos) estatisticamente pouco confiável para prever o próximo movimento. Isso não nega que o valor de longo prazo das empresas importe — só que ele não se revela em padrões gráficos de curto prazo.',
      },
      {
        secao: 'A Hipótese do Mercado Eficiente',
        texto: 'Malkiel argumenta que informação pública se incorpora rapidamente aos preços, o que torna muito difícil para o investidor individual (ou mesmo para gestores profissionais) obter vantagem consistente analisando apenas dados já disponíveis a todo o mercado. Essa é a base teórica para preferir fundos de índice a tentativas de "vencer o mercado".',
      },
      {
        secao: 'Custos e o Poder da Diversificação',
        texto: 'O livro dedica atenção especial ao efeito corrosivo de taxas de administração ao longo de décadas, mostrando como diferenças aparentemente pequenas de percentual se acumulam em somas expressivas de patrimônio perdido. Diversificar entre classes de ativos, setores e geografias é apresentado como a forma mais confiável de reduzir risco sem abrir mão de retorno esperado.',
      },
      {
        secao: 'Estratégias Calibradas por Idade',
        texto: 'Malkiel encerra com recomendações práticas de alocação que mudam conforme a fase de vida: investidores mais jovens podem sustentar mais risco em ações, enquanto quem se aproxima da fase de retirada de renda deve aumentar gradualmente a parcela em renda fixa, revisando essa proporção anualmente.',
      },
    ],
  }
