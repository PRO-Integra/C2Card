//import { SET_VIEW, SUBMIT_PROFILE_SUCCESS, SUBMIT_PROFILE_ERROR } from '../actions/actions';

const initialState = {
  currentView: 'list',
  message: '',
  error: '',
  passos: [{
          id: 1,
          nome: 'Passo 1',
          ativo: true,
          concluido: false
      },
      {
          id: 2,
          nome: 'Passo 2',
          ativo: false,
          concluido: false
      },
      {
          id: 3,
          nome: 'Passo 3',
          ativo: false,
          concluido: false
      },
      {
          id: 4,
          nome: 'Passo 4',
          ativo: false,
          concluido: false
      },
      {
          id: 5,
          nome: 'Passo 5',
          ativo: false,
          concluido: false
      },
      {
          id: 6,
          nome: 'Passo 6',
          ativo: false,
          concluido: false
      },
      {
          id: 7,
          nome: 'Passo 7',
          ativo: false,
          concluido: false
      },
      {
          id: 8,
          nome: 'Passo 8',
          ativo: false,
          concluido: false
      },
      {
          id: 9,
          nome: 'Passo 9',
          ativo: false,
          concluido: false
      }
  ],
  passoAtual: 1,
  isSim: false // Estado inicial do isSim
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_VIEW':
          return {
              ...state,
              currentView: action.payload
          };
      case 'SET_PASSO_ATIVO':
          const {
              id, passos
          } = action.payload;
          // Verifica se todas as etapas anteriores estão concluídas
          const todasAnterioresConcluidas = passos.slice(0, id - 1).every(passo => passo.concluido);
          if (todasAnterioresConcluidas) {
              return {
                  ...state,
                  passos: state.passos.map(passo =>
                      passo.id === id ? {
                          ...passo,
                          ativo: true
                      } : {
                          ...passo,
                          ativo: false
                      }
                  ),
                  passoAtual: id, //atualiza o passo atual
              };
          } else {
              return state; // Retorna o estado sem alterações se as anteriores não estiverem concluídas
          }
      case 'SET_PASSO_CONCLUIDO':
          const {
              passoId
          } = action.payload;
          return {
              ...state,
              passos: state.passos.map(passo =>
                  passo.id === passoId ? {
                      ...passo,
                      concluido: true
                  } : passo
              )
          }
      case 'SET_PASSO_NAO_CONCLUIDO':
          const passoNaoConcluidoId = action.payload.id;
          return {
              ...state,
              passos: state.passos.map((passo) =>
                  passo.id === passoNaoConcluidoId ? {
                      ...passo,
                      concluido: false
                  } : passo
              ),
          };
      case 'TOGGLE_IS_SIM':
          return {
              ...state,
              isSim: action.payload,
          };
      case 'PROXIMO_PASSO':
          const currentPasso = state.passos.find(passo => passo.id === state.passoAtual);
          if (currentPasso.concluido) {
              const proximoPassoId = state.passoAtual + 1;
              const proximoPasso = state.passos.find(passo => passo.id === proximoPassoId);
              if (proximoPasso) {
                  return {
                      ...state,
                      passos: state.passos.map((passo) =>
                          passo.id === proximoPassoId ? {
                              ...passo,
                              ativo: true
                          } : passo
                      ),
                      passoAtual: proximoPassoId, //atualiza o passo atual
                  };
              }
          }
          return state;
     
      default:
          return state;
  }
};

export default appReducer;