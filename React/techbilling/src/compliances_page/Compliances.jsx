import React, { useState, useEffect } from "react";
import "./Compliances.css";

const ComplianceTable = () => {
  const [requirements, setRequirements] = useState([]);
  const [popupContent, setPopupContent] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newCompliance, setNewCompliance] = useState({
    name: "",
    description: "",
    taxpayernumber: "",
    complianceDate: "",
    deadline: "",
    IVA: "",
    coin: "",
    address: "",
    status: "pending",
  });

  // Carrega os requisitos e os estados das caixas de seleção a partir do localStorage aquando o componente é montado.
  useEffect(() => {
    const savedRequirements = JSON.parse(localStorage.getItem("requirements"));
    const savedCheckboxStates = JSON.parse(
      localStorage.getItem("checkboxStates")
    );

    if (savedRequirements) {
      setRequirements(savedRequirements);
    }

    if (savedCheckboxStates) {
      setCheckboxStates(savedCheckboxStates);
    }
  }, []);

  // Guarda os requisitos e os estados das caixas de seleção no localStorage sempre que ocorram alterações.
  useEffect(() => {
    if (requirements.length > 0) {
      localStorage.setItem("requirements", JSON.stringify(requirements));
    }
    localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
  }, [requirements, checkboxStates]);

  // Atualiza o estado de um requisito.
  const setStatus = (id, status) => {
    setRequirements((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: status } : req))
    );
  };

  // Definir título
  useEffect(() => {
    document.title = "Invoices";
  }, []);

  // Lida com a alteração de entrada para novos campos.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompliance((prev) => ({ ...prev, [name]: value }));
  };

  // Adiciona uma nova fatura
  const addNewCompliance = () => {
    if (
      newCompliance.name &&
      newCompliance.description &&
      newCompliance.taxpayernumber &&
      newCompliance.complianceDate &&
      newCompliance.deadline &&
      newCompliance.IVA &&
      newCompliance.coin &&
      newCompliance.address
    ) {
      setRequirements((prev) => [
        ...prev,
        { ...newCompliance, id: prev.length + 1 },
      ]);
      setShowCreatePopup(false);
      setNewCompliance({
        name: "",
        description: "",
        taxpayernumber: "",
        complianceDate: "",
        deadline: "",
        IVA: "",
        coin: "",
        address: "",
        status: "pending",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Abrir o popup de edição com os detalhes da fatura pré-preenchidos.
  const openEditPopup = (id) => {
    const complianceToEdit = requirements.find((req) => req.id === id);
    setNewCompliance({ ...complianceToEdit });
    setActiveRowId(id);
    setShowEditPopup(true);
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCompliance, setPreviewCompliance] = useState(null);

  // Guardar as alterações após editar a fatura.
  const saveEditCompliance = () => {
    setRequirements((prev) =>
      prev.map((req) =>
        req.id === activeRowId ? { ...req, ...newCompliance } : req
      )
    );
    setShowEditPopup(false);
  };

  // Apaga uma fatura
  const deleteRequirement = (id) => {
    setRequirements((prev) => prev.filter((req) => req.id !== id));
    setShowEditPopup(false); // Fecha popup após apagar a fatura
  };

  // SMostrar o popup de requisitos com as caixas de seleção.
  const showPopup = (id, content) => {
    setPopupContent(content);
    setActiveRowId(id);
    setCheckboxStates((prev) => ({
      ...prev,
      [id]: prev[id] || content.map(() => false),
    }));
  };

  // Fecha o popup de requisitos
  const closePopup = () => {
    setPopupContent(null);
    setActiveRowId(null);
  };

  // Lidar com a alteração do estado da caixa de seleção.
  const handleCheckboxChange = (id, index) => {
    setCheckboxStates((prev) => {
      const updatedRow = prev[id] ? [...prev[id]] : [];
      updatedRow[index] = !updatedRow[index];
      return { ...prev, [id]: updatedRow };
    });
  };

  // Verificar se todas as caixas de seleção estão marcadas.
  const areAllCheckboxesChecked = (id) => {
    const checkboxes = checkboxStates[id];
    return checkboxes ? checkboxes.every((state) => state) : false;
  };

  // Formato da data
  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="compliance-table-container">
        <h1>Compliance Requirements</h1>
        <table className="compliance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Description</th>
              <th>Compliance Date</th>
              <th>Deadline</th>
              <th>Taxpayer Number</th>
              <th>IVA</th>
              <th>Coin</th>
              <th>Requirements</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((req) => (
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.address}</td>
                <td>{req.description}</td>
                <td>{formatDate(req.complianceDate)}</td>
                <td>{formatDate(req.deadline)}</td>
                <td>{req.taxpayernumber}</td>
                <td>{req.IVA}%</td>
                <td>{req.coin}</td>
                <td>
                  <button
                    className="help-btn"
                    onClick={() =>
                      showPopup(req.id, [
                        { name: "Name" },
                        { name: "Address" },
                        { name: "Dates" },
                        { name: "Coin" },
                        { name: "IVA" },
                        { name: "Taxpayer number" },
                      ])
                    }
                  >
                    Check Requirements
                  </button>
                </td>
                <td>
                  <span className={`status-indicator ${req.status}`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button
                    className="status-btn pending"
                    onClick={() => setStatus(req.id, "pending")}
                    disabled={req.status === "pending"}
                  >
                    Pending
                  </button>
                  <button
                    className="status-btn completed"
                    onClick={() => setStatus(req.id, "completed")}
                    disabled={req.status === "completed"}
                  >
                    Completed
                  </button>
                  <button
                    className="status-btn canceled"
                    onClick={() => setStatus(req.id, "canceled")}
                    disabled={req.status === "canceled"}
                  >
                    Canceled
                  </button>
                  <button
                    className="status-btn edit"
                    onClick={() => openEditPopup(req.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="create-compliance-btn-container">
          <button
            className="create-compliance-btn"
            onClick={() => setShowCreatePopup(true)}
          >
            Create Compliance
          </button>
        </div>
      </div>

      {/* Criar uma fatura */}
      {showCreatePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create Invoice</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newCompliance.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={newCompliance.address}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={newCompliance.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Taxpayer Number:
                <input
                  type="number"
                  name="taxpayernumber"
                  value={newCompliance.taxpayernumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                IVA (%):
                <input
                  type="number"
                  name="IVA"
                  value={newCompliance.IVA}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </label>
              <label>
                Coin:
                <select
                  name="coin"
                  value={newCompliance.coin}
                  onChange={handleInputChange}
                  className="custom-select"
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD - Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="MXN">MXN - Mexican Peso</option>
                  <option value="BRL">BRL - Brazilian Real</option>
                </select>
              </label>
              <label>
                Compliance Date:
                <input
                  type="date"
                  name="complianceDate"
                  value={newCompliance.complianceDate}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  value={newCompliance.deadline}
                  onChange={handleInputChange}
                />
              </label>
            </form>
            <button className="add-btn" onClick={addNewCompliance}>
              Add
            </button>
            <button
              className="close-btn"
              onClick={() => setShowCreatePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Editar fatura */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Edit Compliance</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newCompliance.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={newCompliance.address}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={newCompliance.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Taxpayer Number:
                <input
                  type="number"
                  name="taxpayernumber"
                  value={newCompliance.taxpayernumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                IVA (%):
                <input
                  type="number"
                  name="IVA"
                  value={newCompliance.IVA}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </label>
              <label>
                Coin:
                <select
                  name="coin"
                  value={newCompliance.coin}
                  onChange={handleInputChange}
                >
                  <option value="USD">USD - Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="MXN">MXN - Mexican Peso</option>
                  <option value="BRL">BRL - Brazilian Real</option>
                </select>
              </label>
              <label>
                Compliance Date:
                <input
                  type="date"
                  name="complianceDate"
                  value={newCompliance.complianceDate}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  value={newCompliance.deadline}
                  onChange={handleInputChange}
                />
              </label>
            </form>
            <button className="save-btn" onClick={saveEditCompliance}>
              Save Changes
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteRequirement(activeRowId)}
            >
              Delete
            </button>
            <button
              className="close-btn"
              onClick={() => setShowEditPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {popupContent && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Requirements</h2>
            <ul>
              {popupContent.map((item, index) => (
                <li key={index} className="help-item">
                  <div className="help-item-text">
                    <span className="help-item-name">{item.name}</span>
                  </div>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id={`checkbox-${activeRowId}-${index}`}
                      checked={checkboxStates[activeRowId]?.[index] || false}
                      onChange={() => handleCheckboxChange(activeRowId, index)}
                    />
                    <label
                      htmlFor={`checkbox-${activeRowId}-${index}`}
                      className="checkbox-custom"
                    ></label>
                  </div>
                </li>
              ))}
            </ul>
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
            <button
              className={`preview-btn ${
                !areAllCheckboxesChecked(activeRowId) ? "disabled" : "enabled"
              }`}
              disabled={!areAllCheckboxesChecked(activeRowId)}
              onClick={() => {
                if (areAllCheckboxesChecked(activeRowId)) {
                  const complianceToPreview = requirements.find(
                    (req) => req.id === activeRowId
                  );
                  setPreviewCompliance(complianceToPreview); //  Definir os dados de pré-visualização.
                  setShowPreviewModal(true); // Mostrar os dados de pré-visualização.
                }
              }}
            >
              Preview
            </button>
            {showPreviewModal && previewCompliance && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h2>Preview Invoice</h2>
                  <div>
                    <p>
                      <strong>Name:</strong> {previewCompliance.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {previewCompliance.address}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {previewCompliance.description}
                    </p>
                    <p>
                      <strong>Taxpayer Number:</strong>{" "}
                      {previewCompliance.taxpayernumber}
                    </p>
                    <p>
                      <strong>IVA:</strong> {previewCompliance.IVA}%
                    </p>
                    <p>
                      <strong>Coin:</strong> {previewCompliance.coin}
                    </p>
                    <p>
                      <strong>Compliance Date:</strong>{" "}
                      {formatDate(previewCompliance.complianceDate)}
                    </p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {formatDate(previewCompliance.deadline)}
                    </p>
                  </div>
                  <button
                    className="close-btn"
                    onClick={() => setShowPreviewModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ComplianceTable;
