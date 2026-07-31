function ExpenseCard({expense = 0}) {

  return (

    <div className="money-card expense-card">


      <div className="icon">

        📉

      </div>




      <div className="card-info">


        <p>
          Toplam Gider
        </p>


        <h2>
          ₺{expense.toLocaleString("tr-TR")}
        </h2>



        <span className="negative">

          ↓ Güncel gider durumu

        </span>



      </div>



    </div>

  );

}


export default ExpenseCard;