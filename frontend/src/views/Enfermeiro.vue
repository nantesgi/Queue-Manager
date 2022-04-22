<template>
  <div id="container">
    <div class="container-cabecalho">
      <div class="informacoes-usuario">
        <p>Guichê: 01</p>
        <p>Usuário: admin</p>
      </div>
      <div class="botao-menu"><p>[]</p></div>
    </div>

    <div class="container-conteudo">
      <div class="container-chamada">
        <div class="container-senha">
          <div class="cabecalho-senha"><p>Senha</p></div>
          <div class="senha-chamada">
            <p>{{ ticket }}</p>
          </div>
        </div>

        <!-- <div class="container-atendimento">
          <div class="cabecalho-atendimento"><p>Tipo de atendimento</p></div>
          <div>
            <p class="id-atendimento">{{ priority }}</p>
          </div>
        </div> -->
      </div>
    </div>

    <!-- <div class="container-botoes-acoes">
      <div>
        <button class="botao-chamar-novamente">Chamar novamente</button>
      </div>
      <div><button class="botao-pular">Ausente</button></div>
      <div>
        <button class="botao-chamar-proximo" @click="callTicket">
          Chamar próximo
        </button>
      </div>
      <div>
        <button class="botao-iniciar-atendimento">Iniciar atendimento</button>
      </div>
    </div> -->

    <div class="container-botoes-acoes">
      <div>
        <button class="botao-chamar-proximo" @click="callTicket" v-if="!ticket">
          Chamar próximo
        </button>
      </div>
      <div>
        <button
          class="botao-chamar-novamente"
          v-if="ticket && callTimes < 2"
          @click="callAgain"
        >
          Chamar novamente
        </button>
      </div>
      <div>
        <button class="botao-pular" v-if="callTimes > 1">Ausente</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: '',
      ticket: 'N150',
      callTimes: 0,
    };
  },
  mounted() {
    this.callTimes = localStorage.getItem('callTimes');
  },
  methods: {
    callTicket: function (skipID) {
      axios
        .get(`http://localhost:3000/api/tickets/${skipID}`)
        .then((res) => {
          console.log(res.data);
          const data = res.data.data.ticket;
          this.id = data._id;
          this.ticket = data.ticket;
        })
        .catch((err) => {
          const msgErro = err.response.data.err;
          console.log(msgErro);
        });
    },
    skipTicket: function () {
      axios
        .patch(`http://localhost:3000/api/tickets/${this.id}`)
        .then((res) => {
          console.log(res.data);
          this.callTicket(this.id);
        })
        .catch((err) => {
          const msgErro = err.response.data.err;
          console.log(msgErro);
        });
    },
    callAgain: function () {
      this.callTimes += 1;
      localStorage.setItem('callTimes', this.callTimes);
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
  height: 100vh;
}

.container-cabecalho {
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
  color: #393939;
  font-weight: 300;
  padding: 15px 15px;
  font-size: 20px;
}

.informacoes-usuario {
  width: 93%;
  margin-left: 15px;
}

.container-conteudo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.container-chamada {
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
}

.container-senha {
  background-color: #005bab;
  color: white;
  border-radius: 5px;
  height: 200px;
  width: 85%;
  font-size: 30px;
  /* justify-content: center; */
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 112px;
}

.cabecalho-senha {
  margin-top: 27.5px;
}

.senha-chamada {
  font-size: 60px;
  font-weight: 600;
  align-items: center;
  margin-top: 20px;
}

.tipo-atendimento {
  font-weight: 600;
}

.id-atendimento {
  font-size: 60px;
  font-weight: 600;
  align-items: center;
  margin-top: 20px;
}

.container-botoes-acoes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
/* 
.container-direita {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 66px;
}

.container-esquerda {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 66px;
} */

.botao-chamar-novamente {
  text-decoration: none;
  border: none;
  display: inline-block;
  padding: 15px 32px;
  margin-top: 20px;
  width: 500px;
  background-color: #0088ff;
  border-radius: 5px;
  font-weight: 600;
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
}

.botao-pular {
  text-decoration: none;
  border: none;
  display: inline-block;
  padding: 15px 32px;
  margin-top: 20px;
  width: 500px;
  background-color: orange;
  border-radius: 5px;
  font-weight: 600;
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
}

.botao-chamar-proximo {
  text-decoration: none;
  border: none;
  display: inline-block;
  padding: 15px 32px;
  margin-top: 20px;
  width: 500px;
  background-color: green;
  border-radius: 5px;
  font-weight: 600;
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
}
/* 
.botao-iniciar-atendimento {
    text-decoration: none;
    border: none;
    display: inline-block;
    padding: 15px 32px;
    width: 500px;
    background-color: rgb(255, 217, 0);
    border-radius: 5px;
    font-weight: 600;
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    margin-top: 40px;
    cursor: pointer;
} */
</style>
