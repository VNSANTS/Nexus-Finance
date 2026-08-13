import type { Livro } from '@/types'

export const livroRapidoEDevagar: Livro =   {
    id: 'rapido-e-devagar',
    titulo: 'Rápido e Devagar: Duas Formas de Pensar',
    autor: 'Daniel Kahneman',
    cor: '#6366F1',
    categoria: 'educacao-financeira',
    paraQuem: 'Quem quer entender os vieses cognitivos que sabotam decisões financeiras antes de confiar cegamente na própria intuição',
    ideias: [
      'O cérebro opera em dois sistemas: o Sistema 1 (rápido, automático, emocional) domina a maior parte das decisões do dia a dia, incluindo financeiras — o Sistema 2 (lento, racional) é preguiçoso por natureza.',
      'A ancoragem distorce qualquer negociação: o primeiro número mencionado vira referência mental, mesmo quando é completamente arbitrário.',
      'O que é fácil de lembrar parece mais provável do que realmente é — notícias dramáticas distorcem a percepção real de risco financeiro.',
      'Perder dói psicologicamente o dobro de ganhar o mesmo valor — essa aversão à perda leva a decisões irracionais só para evitar reconhecer um prejuízo.',
      'Confiança não é evidência: a sensação de certeza reflete a coerência da narrativa contada, não a precisão real da previsão feita.',
    ],
    resumoCompleto: [
      {
        secao: 'Sistema 1 e Sistema 2',
        texto: 'Kahneman descreve dois modos de pensamento: o Sistema 1, rápido e automático, que toma a maioria das decisões cotidianas sem esforço consciente; e o Sistema 2, lento e deliberativo, que exige energia mental e por isso tende a ficar "de folga" na maior parte do tempo. Reconhecer qual sistema está no comando de uma decisão financeira é o primeiro passo para melhorá-la.',
      },
      {
        secao: 'Ancoragem e Disponibilidade',
        texto: 'O primeiro número apresentado numa negociação — mesmo que arbitrário — tende a funcionar como âncora que distorce toda avaliação seguinte. De forma parecida, eventos fáceis de lembrar (como uma crise recente amplamente noticiada) parecem mais prováveis do que realmente são, distorcendo a percepção de risco em decisões de investimento.',
      },
      {
        secao: 'Representatividade e Ilusão de Compreensão',
        texto: 'A heurística da representatividade faz confundir "parecer com" um padrão conhecido com "ser realmente provável" — o que leva a julgamentos equivocados sobre empresas ou tendências de mercado. Kahneman também descreve como, ao olhar para o passado, tendemos a reconstruir narrativas coerentes onde na época havia apenas incerteza e caos.',
      },
      {
        secao: 'Teoria das Perspectivas e Aversão à Perda',
        texto: 'Um dos achados centrais do livro é que a dor de perder uma quantia costuma ser psicologicamente maior do que o prazer de ganhar a mesma quantia — o que leva investidores a manter posições perdedoras por tempo demais só para evitar reconhecer o prejuízo, e a vender posições vencedoras cedo demais.',
      },
      {
        secao: 'Os Dois Eus',
        texto: 'O livro fecha distinguindo o "eu que experimenta", que vive cada momento presente, do "eu que lembra", que constrói a narrativa usada para decidir no futuro — e é esse segundo eu, focado em picos e finais, quem realmente comanda decisões financeiras de longo prazo, mesmo sem representar fielmente a experiência vivida.',
      },
    ],
  }
