import { useEffect, useState } from "react";
import {
  getTransactions,
  createTransaction,
  deleteTransaction
} from "../services/api";


function Transactions() {

  const [transactions, setTransactions] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Gelir");
  const [categoryId, setCategoryId] = useState("1");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  async function loadTransactions() {

    try {

      setPageLoading(true);
      setErrorMessage("");

      const data = await getTransactions();

      setTransactions(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.error(
        "İşlem çekme hatası:",
        error
      );

      setErrorMessage(
        error.message ||
        "İşlemler yüklenemedi."
      );

    } finally {

      setPageLoading(false);

    }

  }


  useEffect(() => {

    loadTransactions();

  }, []);


  async function addTransaction(e) {

    e.preventDefault();

    setMessage("");
    setErrorMessage("");


    if (description.trim() === "") {

      setErrorMessage(
        "Lütfen açıklama gir."
      );

      return;

    }


    if (
      amount === "" ||
      Number(amount) <= 0
    ) {

      setErrorMessage(
        "Lütfen geçerli bir tutar gir."
      );

      return;

    }


    const transaction = {

      amount: Number(amount),

      description: description.trim(),

      isIncome: type === "Gelir",

      categoryId: Number(categoryId)

    };


    try {

      setLoading(true);

      const response =
        await createTransaction(
          transaction
        );


      setMessage(
        response?.message ||
        "İşlem başarıyla eklendi."
      );


      setDescription("");
      setAmount("");
      setType("Gelir");
      setCategoryId("1");


      await loadTransactions();

    } catch (error) {

      console.error(
        "Ekleme hatası:",
        error
      );

      setErrorMessage(
        error.message ||
        "İşlem eklenemedi."
      );

    } finally {

      setLoading(false);

    }

  }


  async function removeTransaction(id) {

    const shouldDelete =
      window.confirm(
        "Bu işlemi silmek istiyor musun?"
      );


    if (!shouldDelete) {
      return;
    }


    setMessage("");
    setErrorMessage("");


    try {

      const response =
        await deleteTransaction(id);


      setMessage(
        response?.message ||
        "İşlem silindi."
      );


      setTransactions(
        currentTransactions =>
          currentTransactions.filter(
            item => item.id !== id
          )
      );

    } catch (error) {

      console.error(
        "Silme hatası:",
        error
      );

      setErrorMessage(
        error.message ||
        "İşlem silinemedi."
      );

    }

  }


  return (

    <div className="transactions-page">

      <div className="transactions-page-header">

        <div>

          <h1>
            İşlemler 💸
          </h1>

          <p>
            Gelir ve giderlerini kolayca takip et.
          </p>

        </div>

      </div>


      <form
        className="transaction-form"
        onSubmit={addTransaction}
      >

        <h2>
          Yeni İşlem Ekle
        </h2>


        {message && (

          <div className="form-message success-message">

            {message}

          </div>

        )}


        {errorMessage && (

          <div className="form-message error-message">

            {errorMessage}

          </div>

        )}


        <div className="form-row">

          <input
            type="text"
            placeholder="Açıklama"
            value={description}
            onChange={
              e => setDescription(
                e.target.value
              )
            }
          />


          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Tutar"
            value={amount}
            onChange={
              e => setAmount(
                e.target.value
              )
            }
          />

        </div>


        <div className="form-row">

          <select
            value={type}
            onChange={
              e => setType(
                e.target.value
              )
            }
          >

            <option value="Gelir">
              Gelir
            </option>

            <option value="Gider">
              Gider
            </option>

          </select>


          <select
            value={categoryId}
            onChange={
              e => setCategoryId(
                e.target.value
              )
            }
          >

            <option value="1">
              Market
            </option>

            <option value="2">
              Kira
            </option>

            <option value="3">
              Fatura
            </option>

            <option value="4">
              Diğer
            </option>

          </select>

        </div>


        <button
          type="submit"
          disabled={loading}
        >

          {
            loading
              ? "Ekleniyor..."
              : "+ İşlem Ekle"
          }

        </button>

      </form>


      <div className="transactions-list">

        <div className="transactions-list-header">

          <h2>
            Tüm İşlemler
          </h2>

          <span>
            {transactions.length} işlem
          </span>

        </div>


        {pageLoading ? (

          <p className="empty-message">
            İşlemler yükleniyor...
          </p>

        ) : transactions.length === 0 ? (

          <p className="empty-message">
            Henüz işlem bulunmuyor.
          </p>

        ) : (

          transactions.map(item => {

            const numericAmount =
              Number(item.amount) || 0;

            const date =
              item.date
                ? new Date(item.date)
                : null;

            return (

              <div
                className="transaction"
                key={item.id}
              >

                <div className="transaction-left">

                  <div className="transaction-icon">

                    {
                      item.isIncome
                        ? "💰"
                        : "💸"
                    }

                  </div>


                  <div>

                    <h4>
                      {item.description}
                    </h4>

                    <p>

                      {item.category || "Diğer"}

                      {" • "}

                      {
                        date &&
                        !Number.isNaN(
                          date.getTime()
                        )
                          ? date.toLocaleDateString(
                              "tr-TR"
                            )
                          : "Tarih yok"
                      }

                    </p>

                  </div>

                </div>


                <div className="transaction-actions">

                  <span
                    className={
                      item.isIncome
                        ? "income"
                        : "expense"
                    }
                  >

                    {
                      item.isIncome
                        ? "+"
                        : "-"
                    }

                    ₺
                    {
                      numericAmount.toLocaleString(
                        "tr-TR",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2
                        }
                      )
                    }

                  </span>


                  <button
                    type="button"
                    className="delete-button"
                    title="İşlemi sil"
                    onClick={
                      () =>
                        removeTransaction(
                          item.id
                        )
                    }
                  >

                    🗑️

                  </button>

                </div>

              </div>

            );

          })

        )}

      </div>

    </div>

  );

}


export default Transactions;