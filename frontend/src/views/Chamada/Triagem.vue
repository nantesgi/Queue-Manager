<template>
  <div id="container">
    <div class="container-cabecalho">
      <div class="nome-hospital">
        <p>Hospital Universitário Maria Aparecida Pedrossian</p>
      </div>
      <div class="horario">
        <p>{{ time }}</p>
      </div>
    </div>

    <div class="container-conteudo">
      <div class="container-ultimas-senhas">
        <div class="cabecalho-ultimas-senhas"><p>Últimas senhas</p></div>
        <!-- tabelinha das ultimas senhas chamadas -->
        <table>
          <thead>
            <tr>
              <th>Senha</th>
              <th>Sala</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>N098</td>
              <td>2</td>
            </tr>

            <tr>
              <td>P401</td>
              <td>6</td>
            </tr>

            <tr>
              <td>P232</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container-chamada">
        <div class="container-senha">
          <div class="cabecalho-senha"><p>Senha</p></div>
          <div class="senha-chamada">
            <p>{{ ticket }}</p>
          </div>
          <div class="tipo-atendimento">
            <p>{{ priority }}</p>
          </div>
        </div>

        <div class="container-sala">
          <div class="cabecalho-sala"><p>Sala</p></div>
          <div>
            <p class="id-sala">{{ room }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sound from '../../assets/atendimento.mp3';
import io from 'socket.io-client';
const socket = io('http://localhost:3001/');
const music = new Audio(sound);
export default {
  data() {
    return {
      time: '',
      ticket: '',
      priority: '',
      room: '',
      lastTickets: [],
    };
  },
  created() {
    setInterval(this.horaAtual, 1000);
    socket.on('ticket', (data) => {
      this.ticket = data.ticket;
      this.priority = data.priority;
      this.room = data.roomID;
      this.proximo();
    });
  },
  mounted() {},
  methods: {
    horaAtual: function () {
      const today = new Date();
      const hours =
        today.getHours() >= 10 ? today.getHours() : '0' + today.getHours();
      const minutes =
        today.getMinutes() >= 10
          ? today.getMinutes()
          : '0' + today.getMinutes();
      const seconds =
        today.getSeconds() >= 10
          ? today.getSeconds()
          : '0' + today.getSeconds();
      this.time = `${hours}:${minutes}:${seconds}`;
    },
    proximo: function () {
      if (this.ticket) {
        this.lastTickets.push({
          ticket: this.ticket,
          room: this.room,
        });
      }
      music.play();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Poppins:wght@300;600;800&display=swap');

* {
  margin: 0;
  padding: 0;
}

#container {
  background-color: #e8e8e8;
  font-family: Poppins;
  text-transform: uppercase;
  width: 100%;
  height: 100vh;
}

.container-cabecalho {
  display: flex;
  flex-direction: row;
  background-color: #393939;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  padding: 32px 15px 15px 32px;
  font-size: 20px;
}

.nome-hospital {
  width: 90%;
  margin-left: 15px;
}

.container-conteudo {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.cabecalho-ultimas-senhas {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  font-size: 20px;
  width: 40%;
  margin: auto;
  margin-top: 20px;
}

th {
  background-color: #636363;
  color: white;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.container-ultimas-senhas {
  margin-top: 400px;
  width: 65%;
}

.container-chamada {
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 640px;
  margin-right: 15px;
  text-align: center;
}

.container-senha {
  margin-top: 15px; /*ver como faz pra dar aqueles espaçamentos em porcentagem, a cada intervalo*/
  background-color: #005bab;
  color: white;
  border-radius: 5px;
  height: 50%;
  font-size: 30px;
  align-items: center;
}

.cabecalho-senha {
  font-weight: 600;
}

.senha-chamada {
  font-size: 120px;
  font-weight: 600;
  align-items: center;
  margin-top: 17px;
}

.tipo-atendimento {
  font-weight: 600;
}

.container-sala {
  background-color: #005bab;
  color: white;
  border-radius: 5px;
  height: 50%;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 30px;
}

.cabecalho-sala {
  font-weight: 600;
}

.id-sala {
  font-size: 120px;
  font-weight: 600;
  align-items: center;
  margin-top: 17px;
}
</style>
