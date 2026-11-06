// Simulador de reserva educacional sem API, cookies ou armazenamento.
(() => {
  const valor = document.getElementById('valor')
  const dias = document.getElementById('dias')
  const total = document.getElementById('total')
  const detalhe = document.getElementById('detalhe')
  const erro = document.getElementById('erro')
  const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

  const atualizar = () => {
    const porDia = Number(valor.value)
    const prazo = Number(dias.value)
    const validos = valor.value.trim() !== '' && dias.value.trim() !== '' &&
      Number.isFinite(porDia) && porDia >= 0 && porDia <= 100000 &&
      Number.isInteger(prazo) && prazo >= 1 && prazo <= 3650 &&
      Math.round(porDia * 100) / 100 === porDia

    if (!validos) {
      erro.textContent = 'Informe um valor de R$ 0 a R$ 100.000, com até 2 casas decimais, e um prazo de 1 a 3.650 dias.'
      total.textContent = '—'
      detalhe.textContent = 'Ajuste os campos para calcular.'
      return
    }

    const centavos = Math.round(porDia * 100)
    const soma = (centavos * prazo) / 100
    erro.textContent = ''
    total.textContent = moeda.format(soma)
    detalhe.textContent = `${moeda.format(centavos / 100)} por dia durante ${prazo.toLocaleString('pt-BR')} ${prazo === 1 ? 'dia' : 'dias'}.`
  }

  valor.addEventListener('input', atualizar)
  dias.addEventListener('input', atualizar)
  document.getElementById('simulador').addEventListener('submit', event => event.preventDefault())
  atualizar()
})()
