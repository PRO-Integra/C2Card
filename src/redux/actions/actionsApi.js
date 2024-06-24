import axios from 'axios';

export const ADD_FUNCIONARIO_REQUEST = 'ADD_FUNCIONARIO_REQUEST';
export const ADD_FUNCIONARIO_SUCCESSO = 'ADD_FUNCIONARIO_SUCCESSO';
export const ADD_FUNCIONARIO_FALHA = 'ADD_FUNCIONARIO_FALHA';

export const GET_FUNCIONARIOS_REQUEST = 'GET_FUNCIONARIOS_REQUEST';
export const GET_FUNCIONARIOS_SUCCESSO = 'GET_FUNCIONARIOS_SUCCESSO';
export const GET_FUNCIONARIOS_FALHA = 'GET_FUNCIONARIOS_FALHA';

export const UPDATE_FUNCIONARIO_REQUEST = 'UPDATE_FUNCIONARIO_REQUEST';
export const UPDATE_FUNCIONARIO_SUCCESSO = 'UPDATE_FUNCIONARIO_SUCCESSO';
export const UPDATE_FUNCIONARIO_FALHA = 'UPDATE_FUNCIONARIO_FALHA';

export const DELETE_FUNCIONARIO_REQUEST = 'DELETE_FUNCIONARIO_REQUEST';
export const DELETE_FUNCIONARIO_SUCCESSO = 'DELETE_FUNCIONARIO_SUCCESSO';
export const DELETE_FUNCIONARIO_FALHA = 'DELETE_FUNCIONARIO_FALHA';

export const FILTRAR_FUNCIONARIOS_ATIVOS = 'FILTRAR_FUNCIONARIOS_ATIVOS';
export const LIMPAR_FILTRO_FUNCIONARIOS = 'LIMPAR_FILTRO_FUNCIONARIOS';

export const FUNCIONARIO_EDICAO = 'FUNCIONARIO_EDICAO';


const API_URL = process.env.REACT_APP_API_URL;
// Add Funcionario
export const addFuncionario = (funcionarioData) => async (dispatch) => {
    try {

        //dispara carregamento  
        dispatch({
            type: ADD_FUNCIONARIO_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {
            data
        } = await axios.post(`${API_URL}/api/funcionarios`, funcionarioData, config);
        //sucesso
        dispatch({
            type: ADD_FUNCIONARIO_SUCCESSO,
            payload: data
        });
    } catch (error) {
        //em caro de erro
        dispatch({
            type: ADD_FUNCIONARIO_FALHA,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        });
    }
};

// Get Funcionarios
export const getFuncionarios = () => async (dispatch) => {
    try {
        // dispatch({ type: GET_FUNCIONARIOS_REQUEST }); //carrega o loading
        const {
            data
        } = await axios.get(`${API_URL}/api/getFuncionarios`);

        dispatch({
            type: GET_FUNCIONARIOS_SUCCESSO,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_FUNCIONARIOS_FALHA,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        });
    }
};

// Update Funcionario
export const updateFuncionario = (id, funcionarioData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_FUNCIONARIO_REQUEST
        }); //load

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {
            data
        } = await axios.put(`${API_URL}/api/updatefuncionarios/${id}`, funcionarioData, config);

        dispatch({
            type: UPDATE_FUNCIONARIO_SUCCESSO,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_FUNCIONARIO_FALHA,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        });
    }
};

// Delete Funcionario
export const deleteFuncionario = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_FUNCIONARIO_REQUEST
        });

        await axios.delete(`${API_URL}/api/deleteFuncionarios/${id}`);

        dispatch({
            type: DELETE_FUNCIONARIO_SUCCESSO,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: DELETE_FUNCIONARIO_FALHA,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        });
    }
};
//filtros
export const filtrarFuncionariosAtivos = () => ({
    type: FILTRAR_FUNCIONARIOS_ATIVOS,
});

export const limparFiltroFuncionarios = () => ({
    type: LIMPAR_FILTRO_FUNCIONARIOS,
});
//armazenar qual funcionario foi selecionado para enviar para o formulario 
export const adicionarFuncionarioEdicao = (funcionarioEdicao) => ({
    type: FUNCIONARIO_EDICAO,
    payload: funcionarioEdicao,
})