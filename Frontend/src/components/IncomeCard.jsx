function IncomeCard({income = 0}) {

  return (

    <div className="money-card income-card">


      <div className="icon">

        📈

      </div>


      <div className="card-info">


        <p>
          Toplam Gelir
        </p>


        <h2>
          ₺{income.toLocaleString("tr-TR")}
        </h2>


        <span className="positive">

          ↑ Güncel gelir durumu

        </span>


      </div>


    </div>

  );

}


export default IncomeCard;