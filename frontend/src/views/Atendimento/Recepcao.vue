<template>
  <div id="container">
    <div class="container-cabecalho">
      <div class="informacoes-usuario">
        <p>Guichê: 01</p>
        <p>Usuário: admin</p>
      </div>
      <div class="botao-menu">
        <input type="image" class="botao-menu" src="../../assets/menu.svg" />
      </div>
    </div>

    <div class="container-conteudo">
      <div class="titulo-conteudo">Dados do paciente</div>

      <form action="#">
        <div class="container-dados-usuario">
          <div class="box-input">
            <span class="titulo-input">CPF</span>
            <input
              type="text"
              name="CPF"
              placeholder="Digite o CPF"
              required
              v-maska="'###.###.###-##'"
            />
          </div>

          <div class="box-input">
            <span class="titulo-input">Nome completo</span>
            <input type="text" placeholder="Digite o nome completo" required />
          </div>

          <div class="box-input">
            <span class="titulo-input">E-mail</span>
            <input type="email" placeholder="Digite o e-mail" required />
          </div>
          <div class="box-input">
            <span class="titulo-input">Telefone celular</span>
            <input
              type="tel"
              name="telefone"
              required
              v-maska="'(##) #####-####'"
            />
          </div>

          <div class="box-input">
            <span class="titulo-input">Endereço</span>

            <div class="flex-endereco">
              <div class="lado-cep">
                <span class="titulo-input-endereco">CEP</span>
                <input
                  type="text"
                  placeholder=""
                  required
                  v-maska="'#####-###'"
                  v-on:input="debounceInput"
                />
              </div>

              <div class="lado-rua">
                <span class="titulo-input-endereco">Rua</span>
                <input
                  type="text"
                  placeholder=""
                  required
                  v-model="this.street"
                />
              </div>

              <div class="lado-num">
                <span class="titulo-input-endereco">Número</span>
                <input type="text" placeholder="" required />
              </div>
            </div>

            <div class="flex-endereco">
              <div class="lado-bairro">
                <span class="titulo-input-endereco">Bairro</span>
                <input type="text" placeholder="" required />
              </div>

              <div class="lado-complem">
                <span class="titulo-input-endereco">Complemento</span>
                <input type="text" placeholder="" />
              </div>
            </div>

            <div class="flex-endereco">
              <div class="lado-cidade">
                <span class="titulo-input-endereco">Cidade</span>
                <select name="cidade" id="cidade">
                  <option selected disabled>Selecione</option>
                  <option value="campo-grande">Campo Grande</option>
                  <option value="rio-de-janeiro">Rio de Janeiro</option>
                  <option value="sao-paulo">São Paulo</option>
                </select>
              </div>

              <div class="lado-estado">
                <span class="titulo-input-endereco">Estado</span>
                <select name="estado" id="estado">
                  <option selected disabled>Selecione</option>
                  <option value="MS">MS</option>
                  <option value="RJ">RJ</option>
                  <option value="SP">SP</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="botao-finalizar-atendimento">
          <input type="submit" value="Finalizar atendimento" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { maska } from 'maska';
import _ from 'lodash';
import axios from 'axios';
export default {
  directives: { maska },
  data() {
    return {
      zip: '',
      street: '',
    };
  },
  methods: {
    debounceInput: _.debounce(function (e) {
      this.zip = e.target.value;
      this.searchZIP();
    }, 500),
    searchZIP: function () {
      axios
        .get(`https://viacep.com.br/ws/${this.zip}/json`)
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          this.street = data.logradouro;
        })
        .catch((err) => {
          const msgErro = err.response.data.err;
          console.log(msgErro);
        });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Poppins:wght@300;400;500;600;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

#container {
  height: 100%;
  background-color: #e8e8e8;
}

.container-cabecalho {
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
  /* color: #393939; */
  color: black;
  font-weight: 300;
  padding: 15px 15px;
  font-size: 20px;
  font-weight: 600;
}

.informacoes-usuario {
  width: 93%;
  margin-left: 105px;
}

.botao-menu {
  border: none;
  margin-top: 5px;
  width: 45px;
  height: 45px;
}

.container-conteudo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.titulo-conteudo {
  font-size: 30px;
  font-weight: 500;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  margin-left: -960px;
}

.titulo-conteudo::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  border-radius: 5px;
  background-color: blue;
}

.container-dados-usuario {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  width: 1250px;
}

.box-input {
  margin-bottom: 15px;
  width: 100%;
}

span.titulo-input {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

span.titulo-input-endereco {
  font-size: 14px;
}

.box-input input,
select {
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}

.box-input input:focus,
.box-input input:valid {
  border-color: #a5c4ff;
}

.flex-endereco {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

.lado-cep {
  width: 20%;
  margin-right: 15px;
}

.lado-rua {
  width: 70%;
  margin-right: 15px;
}

.lado-num {
  width: 10%;
}

.lado-bairro {
  width: 70%;
  margin-right: 15px;
}

.lado-complem {
  width: 30%;
}

.lado-cidade {
  width: 90%;
  margin-right: 15px;
}

.lado-estado {
  width: 10%;
}

.urgencia-titulo {
  font-size: 20px;
  font-weight: 500;
}

.categoria {
  display: flex;
  width: 50%;
  margin: 20px 0;
  justify-content: space-between;
}

.categoria label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dot {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  margin-right: 10px;
  background: #d9d9d9;
  border: 5px solid transparent;
  transition: all 0.3s ease;
}

#dot-1:checked ~ .categoria label .one {
  background: red;
  border-color: #d9d9d9;
}

#dot-2:checked ~ .categoria label .two {
  background: rgb(255, 166, 0);
  border-color: #d9d9d9;
}

#dot-3:checked ~ .categoria label .three {
  background: yellow;
  border-color: #d9d9d9;
}

#dot-4:checked ~ .categoria label .four {
  background: green;
  border-color: #d9d9d9;
}

#dot-5:checked ~ .categoria label .five {
  background: blue;
  border-color: #d9d9d9;
}

form input[type='radio'] {
  display: none;
}

form .botao-finalizar-atendimento {
  height: 45px;
  margin: 35px 0;
}

form .botao-finalizar-atendimento input {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #005bab;
}

form .botao-finalizar-atendimento input:hover {
  /* transform: scale(0.99); */
  background: #0167c0;
}

@media (max-width: 584px) {
  .container {
    max-width: 100%;
  }

  form .container-dados-usuario .box-input {
    margin-bottom: 15px;
    width: 100%;
  }

  form .categoria {
    width: 100%;
  }

  .container-dados-usuario {
    max-height: 300px;
    overflow-y: scroll;
  }

  .container-dados-usuario::-webkit-scrollbar {
    width: 5px;
  }
}

@media (max-width: 459px) {
  .container .container-conteudo .categoria {
    flex-direction: column;
  }
}
</style>
