export const SET_VIEW = 'SET_VIEW';
export const SET_PASSO_ATIVO = 'SET_PASSO_ATIVO';
export const SET_PASSO_CONCLUIDO = 'SET_PASSO_CONCLUIDO';
export const TOGGLE_IS_SIM = 'TOGGLE_IS_SIM';
export const SET_PASSO_NAO_CONCLUIDO = 'SET_PASSO_NAO_CONCLUIDO';
export const PROXIMO_PASSO = 'PROXIMO_PASSO';
export const PASSO_ANTERIOR = 'PASSO_ANTERIOR';
//view para alternar fomrulario e listagem no passo 1
export const setView = (view) => ({
    type: SET_VIEW,
    payload: view
});
//atualiza o passo que foi ativado
export const setPassoAtivo = (id, passos) => {
    return {
        type: SET_PASSO_ATIVO,
        payload: {
            id,
            passos
        }
    };
};
//atualiza se a etapa foi concluída
export const marcarPassoConcluido = (passoId) => ({
    type: SET_PASSO_CONCLUIDO,
    payload: {
        passoId
    }
});
export const desmarcarPassoNaoConcluido = (id) => ({
    type: SET_PASSO_NAO_CONCLUIDO,
    payload: {
        id
    },
});
//ação do botao de ativo e inativo para cada etapa
export const toggleIsSim = (value) => ({
    type: TOGGLE_IS_SIM,
    payload: value,
});


