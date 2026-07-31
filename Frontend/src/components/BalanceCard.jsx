function BalanceCard({balance = 0}) {

  return (

    <div className="money-card balance-card">


      <div className="icon">
        💰
      </div>



      <div className="card-info">


        <p>
          Toplam Bakiye
        </p>


        <h2>
          ₺{balance.toLocaleString("tr-TR")}
        </h2>



        <span className="positive">

          ↑ Güncel durum

        </span>


      </div>


    </div>

  );

}


export default BalanceCard;