
let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 15),
    dataCheckIn: new Date(2024, 2, 26, 9, 30)
  },
  {
    nome: "Ana Costa",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 14, 45),
    dataCheckIn: null
  },
  {
    nome: "Luiz Fernandes",
    email: "luiz@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 16, 00),
    dataCheckIn: new Date(2024, 2, 28, 14, 15)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 18, 30),
    dataCheckIn: null
  },
  {
    nome: "Carlos Pereira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 20, 00),
    dataCheckIn: new Date(2024, 3, 1, 19, 00)
  },
  {
    nome: "Sofia Gonçalves",
    email: "sofia@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 9, 15),
    dataCheckIn: new Date(2024, 3, 2, 21, 30)
  },
  {
    nome: "Ricardo Alves",
    email: "ricardo@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 12, 00),
    dataCheckIn: new Date(2024, 3, 3, 10, 20)
  },
  {
    nome: "Fernanda Lima",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 15, 45),
    dataCheckIn: new Date(2024, 3, 4, 13, 50)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 17, 30),
    dataCheckIn: new Date(2024, 3, 5, 15, 25)
  }
];


const criarNovoParticipante = (participante) => {
const dataInscricao = dayjs(Date.now())
.to(participante.dataInscricao)
let dataCheckIn = dayjs(Date.now()) 
.to(participante.dataCheckIn)

if(participante.dataCheckIn == null) {
dataCheckIn = `
<button
data-email="${participante.email}"
onclick="fazerCheckIn(event)"
> 
Confirmar check-in
</button>
`
}

  return `
   <tr>
      <td>
        <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
         ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista =  (participantes) => {
  let output = ""
  for(let participante of participantes) {
output = output + criarNovoParticipante(participante)
  }



  document
  .querySelector('tbody')
  .innerHTML = output 
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

//verificar se o participante já existe 
const participanteExiste = participantes.find(
  (p)=> p.email == participante.email
  
)

if(participanteExiste) {
  alert('Email já cadastrado')
  return
}


participantes = [participante, ...participantes]
atualizarLista(participantes)

//limpar o formulario
event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
//confirmar se realmente quer fazer o check-in
const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'


if(confirm(mensagemConfirmacao)== false) {
  return
}


  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista de participantes
  atualizarLista(participantes)
}