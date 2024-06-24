import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import seta from "../assets/imagens/seta.png";
import { useSelector, useDispatch } from "react-redux";
import InputMask from "react-input-mask";
import { addFuncionario, updateFuncionario } from "../redux/actions/actionsApi";
import { setView } from "../redux/actions/actions";
import ModalComponente from "./modal";

const FuncionarioAdd = ({ editMode }) => {
  const dispatch = useDispatch();
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setNascimento] = useState("");
  const [rg, setRg] = useState("");
  const [usesEpi, setUsesEpi] = useState(false);
  const [cargo, setCargo] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [selecaoArquivo, setSelecaoArquivo] = useState(null);
  const { loading, mensagem } = useSelector((state) => state.funcionario);
  const funcionarioEdicao = useSelector(
    (state) => state.funcionario.funcionarioEdicao
  );
  const [arraAtividade, setArraAtividade] = useState([
    { atividade: "", arrayEPI: [{ ca: "", epi: "" }] },
  ]);

  //atualiza o formulario os caso se for uma edição
  useEffect(() => {
    if (editMode && funcionarioEdicao) {
      setNome(funcionarioEdicao.nome);
      setCPF(funcionarioEdicao.cpf);
      setSexo(funcionarioEdicao.sexo);
      setNascimento(funcionarioEdicao.dataNascimento);
      setRg(funcionarioEdicao.rg);
      setUsesEpi(funcionarioEdicao.usesEpi);
      setCargo(funcionarioEdicao.cargo);
      setAtivo(funcionarioEdicao.ativo);
      setSelecaoArquivo(funcionarioEdicao.selecaoArquivo);
      setArraAtividade(funcionarioEdicao.atividades);
    }
  }, [editMode, funcionarioEdicao]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosFuncinarios = {
      nome: nome,
      cpf: cpf,
      sexo: sexo,
      dataNascimento: dataNascimento,
      rg: rg,
      cargo: cargo,
      usesEpi: usesEpi,
      ativo: ativo,
      selecaoArquivo: selecaoArquivo,
      atividades: arraAtividade,
    };
    //dispara a ação de edicao
    if (editMode) {
      dispatch(updateFuncionario(funcionarioEdicao._id, dadosFuncinarios));
    } else {
       //dispara a ação de cadastro
      dispatch(addFuncionario(dadosFuncinarios));
    }
  };
  
  //converte o arquivo em base64 para enviar para o backend em formato json
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        const fileType = file.type;
        resolve(`data:${fileType};base64,${base64String}`);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const setArquivoForm = async (event) => {
    const file = event.target.files[0];
    try {
      const base64String = await convertToBase64(file);
      setSelecaoArquivo(base64String);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const toggleState = () => {
    setAtivo(!ativo);
  };
  //adicionar um bloco atividade(frame)
  const adicionarAtividadeArray = (e) => {
    e.preventDefault();
    setArraAtividade([
      ...arraAtividade,
      { atividade: "", arrayEPI: [{ ca: "", epi: "" }] },
    ]);
  };
  //remover atividade
  const removerAtividadeArray = (index, e) => {
    e.preventDefault();
    const updatedAtividades = [...arraAtividade];
    updatedAtividades.splice(index, 1);
    setArraAtividade(updatedAtividades);
  };
  //adicionar uma atividade no bloco
  const setAtividadeArray = (e, index, field) => {
    console.log(e.target.value);
    const newAtividade = [...arraAtividade];
    newAtividade[index][field] = e.target.value;
    setArraAtividade(newAtividade);
  };
  //adicionar um bloco de epi
  const adicionarEpiArray = (atividadeIndex, e) => {
    e.preventDefault();
    const newAtividade = [...arraAtividade];
    newAtividade[atividadeIndex].arrayEPI.push({ ca: "", epi: "" });
    setArraAtividade(newAtividade);
  };
  //remover um bloco de epi
  const removerEpiArray = (index, indexEpi, e) => {
    e.preventDefault();
    const updatedAtividades = [...arraAtividade];
    updatedAtividades[index]["arrayEPI"].splice(indexEpi, 1);
    setArraAtividade(updatedAtividades);
  };
  //adicionar um elemento no bloco epi
  const setAtividadeEpiArray = (e, index, fieldAPI, indexEPI) => {
    console.log(arraAtividade, "arraAtividade");
    const newAtividade2 = [...arraAtividade];
    newAtividade2[index]["arrayEPI"][indexEPI][fieldAPI] = e.target.value;
    setArraAtividade(newAtividade2);
    console.log(newAtividade2, "arraAtividade");
  };
  //Determina se o funcionario usa epi
  const setEpiFuncionario = () => {
    const newUsesEpi = !usesEpi;
    setUsesEpi(newUsesEpi);
    if (!newUsesEpi) {
      setArraAtividade([{ atividade: "", arrayEPI: [{ ca: "", epi: "" }] }]);
    }
  };

  const handleNavClick = (page) => {
    dispatch(setView(page));
  };

  return (
    <div>
      <div className="titulo-form">
        <img
          onClick={() => handleNavClick("list")}
          src={seta}
          alt="seta-menu-superior"
        />
        <h3 className="p-3">
          {editMode ? "Editar Funcionário" : "Adicionar Funcionário"}
        </h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          as={Row}
          className="mb-3 form-container"
          controlId="formName"
        >
          <Row>
            <Col sm={12} lg={6} className="box-sessao">
              <label>O trabalhador está ativo ou inativo? </label>
            </Col>
            <Col sm={12} lg={6}>
              <div className="box-botao-confirmacao">
                <div className="box-botao-interno">
                  <div className="toggle-button-cadastro" onClick={toggleState}>
                    <div
                      className="circle"
                      style={{ order: ativo ? 2 : 1 }}
                    ></div>
                    <div className="text" style={{ order: ativo ? 1 : 2 }}>
                      {ativo ? "Ativo" : "Inativo"}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 form-container"
          controlId="formPosition"
        >
          <Row>
            <Col sm={12} lg={6}>
              <Form.Label className="mt-2">Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mb-2"
                style={{ border: "2px solid #649FBF" }}
              />
            </Col>
            <Col
              sm={12}
              lg={6}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label className="mt-2">Sexo</Form.Label>
              <div className="box-radio-button">
                <Form.Check
                  type="radio"
                  label="Masculino"
                  name="sexo"
                  value="masculino"
                  checked={sexo === "masculino"}
                  onChange={(e) => setSexo(e.target.value)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Feminino"
                  name="sexo"
                  value="feminino"
                  checked={sexo === "feminino"}
                  onChange={(e) => setSexo(e.target.value)}
                  inline
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={6}>
              <Form.Label>CPF</Form.Label>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              >
                {(inputProps) => (
                  <Form.Control
                    type="text"
                    style={{ border: "2px solid #649FBF" }}
                    placeholder="Digite o CPF"
                    {...inputProps}
                  />
                )}
              </InputMask>
            </Col>
            <Col sm={12} lg={6}>
              <Form.Label>Data de Nascimento</Form.Label>
              <InputMask
                mask="99/99/9999"
                value={dataNascimento}
                onChange={(e) => setNascimento(e.target.value)}
              >
                {(inputProps) => (
                  <Form.Control
                    type="text"
                    style={{ border: "2px solid #649FBF" }}
                    placeholder="Digite a data de nascimento"
                    {...inputProps}
                  />
                )}
              </InputMask>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={12} lg={6}>
              <Form.Label className="mt-2">RG</Form.Label>
              <Form.Control
                type="text"
                placeholder="RG"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                className="mb-2"
                style={{ border: "2px solid #649FBF" }}
              />
            </Col>
            <Col sm={12} lg={6} className="custom-select">
              <Form.Label className="mt-2">Cargo</Form.Label>
              <Form.Control
                as="select"
                style={{ border: "2px solid #649FBF" }}
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              >
                <option value="">Selecione o cargo</option>
                <option value="developer">Desenvolvedor</option>
                <option value="designer">Designer</option>
                <option value="manager">Gerente</option>
                <option value="analyst">Analista</option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 form-container"
          controlId="formPosition"
        >
          <Row>
            <Col sm={12} lg={6} className="box-sessao">
              <label className="pt-2 pb-2">
                Quais EPIs o trabalhador usa na atividade?{" "}
              </label>
            </Col>
          </Row>

          <Row>
            <Col sm={12} lg={6}>
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  id="usesEpi"
                  checked={usesEpi}
                  onChange={setEpiFuncionario}
                />
                <label htmlFor="usesEpi"> O trabalhador não usa EPI.</label>
              </div>
            </Col>
          </Row>
          {!usesEpi && (
            <Row>
              <Row>
                {arraAtividade.map((atividade, atividadeIndex) => (
                  <Col
                    sm={12}
                    lg={12}
                    style={{
                      border: "2px solid #649FBF",
                      borderRadius: "10px 10px 10px 10px",
                      marginTop: "20px",
                    }}
                    key={atividadeIndex}
                  >
                    <Row>
                      <label className="pt-2 pb-2">
                        Selecione a atividade:
                      </label>
                    </Row>
                    <Row>
                      <Col sm={12} lg={12}>
                        <Form.Control
                          as="select"
                          style={{ border: "2px solid #649FBF" }}
                          value={atividade.atividade}
                          onChange={(e) =>
                            setAtividadeArray(e, atividadeIndex, "atividade")
                          }
                        >
                          <option value="">Selecione a atividade</option>
                          <option value="Demolição">Demolição</option>
                          <option value="Manuseio de pesticidas">
                            Manuseio de pesticidas
                          </option>
                          <option value="Operação de máquinas">
                            Operação de máquinas
                          </option>
                        </Form.Control>
                      </Col>
                    </Row>
                    {atividade.arrayEPI.map((epi, epiIndex) => (
                      <Row className="mt-2" key={epiIndex}>
                        <Col sm={6} lg={4}>
                          <Form.Label className="mt-2">
                            Selecione o EPI
                          </Form.Label>
                          <Form.Control
                            as="select"
                            style={{ border: "2px solid #649FBF" }}
                            value={epi.epi}
                            onChange={(e) =>
                              setAtividadeEpiArray(
                                e,
                                atividadeIndex,
                                "epi",
                                epiIndex
                              )
                            }
                          >
                            <option value="">Selecione o EPI</option>
                            <option value="Luvas">Luvas</option>
                            <option value="Capacete de segurança">
                              Capacete de segurança
                            </option>
                            <option value="Protetor auditivo, ">
                              Protetor auditivo{" "}
                            </option>
                          </Form.Control>
                        </Col>
                        <Col sm={6} lg={4}>
                          <Form.Label className="mt-2">
                            Informe o número do CA
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="CA"
                            value={epi.ca}
                            className="mb-2"
                            style={{ border: "2px solid #649FBF" }}
                            onChange={(e) =>
                              setAtividadeEpiArray(
                                e,
                                atividadeIndex,
                                "ca",
                                epiIndex
                              )
                            }
                          />
                        </Col>
                        <Col sm={6} lg={4}>
                          {epiIndex === atividade.arrayEPI.length - 1 ? (
                            <div className="botao-form-cadastro mt-3">
                              <button
                                onClick={(e) =>
                                  adicionarEpiArray(atividadeIndex, e)
                                }
                              >
                                Adicionar EPI
                              </button>
                            </div>
                          ) : (
                            <div className="botao-form-cadastro mt-3">
                              <button
                                onClick={(e) =>
                                  removerEpiArray(atividadeIndex, epiIndex, e)
                                }
                              >
                                Excluir EPI
                              </button>
                            </div>
                          )}
                        </Col>
                      </Row>
                    ))}
                    <Row>
                      <Col sm={12} lg={12}>
                        {atividadeIndex === arraAtividade.length - 1 ? (
                          <div className="botao-form-cadastro mb-5">
                            <button onClick={(e) => adicionarAtividadeArray(e)}>
                              Adicionar Atividade
                            </button>
                          </div>
                        ) : (
                          <div className="botao-form-cadastro mb-5">
                            <button
                              onClick={(e) =>
                                removerAtividadeArray(atividadeIndex, e)
                              }
                            >
                              Excluir Atividade
                            </button>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col
                  sm={12}
                  lg={12}
                  style={{
                    border: "2px solid #649FBF",
                    borderRadius: "10px 10px 10px 10px",
                    marginTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <Row>
                    <label className="pt-2 pb-2">
                      Adicione Atestado de Saúde (opcional):
                    </label>
                  </Row>
                  <Row>
                    <Col sm={6} lg={12}>
                      <Form.Control
                        type="file"
                        style={{ border: "2px solid #649FBF" }}
                        onChange={setArquivoForm} // Attach the handler
                      ></Form.Control>
                      {editMode && selecaoArquivo && (
                        <div>
                          <label className="mt-2">
                            Pré-visualização do Atestado de Saúde:
                          </label>
                          <embed
                            src={selecaoArquivo}
                            type="application/pdf"
                            width="100%"
                            height="200px"
                            style={{
                              border: "2px solid #649FBF",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          )}
          <Row className="mb-3">
            <Col sm={12} lg={12}>
              <div className="botao-form-cadastro mt-3 mb-3">
                <button disabled={loading}>
                  {loading ? "Carregando..." : "Salvar"}
                </button>
              </div>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <ModalComponente />{/*componente de confirmação modal*/}
    </div>
  );
};

export default FuncionarioAdd;
