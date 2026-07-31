function RecentTransactions({ transactions = [] }) {


  return (

    <div className="transactions-box">


      <h2>
        Son İşlemler
      </h2>




      {
        transactions.length === 0 ? (

          <p>
            Henüz işlem bulunmuyor.
          </p>

        ) : (


          transactions.slice(0,5).map((item,index)=>{


            const categoryName =

              typeof item.category === "string"

              ?

              item.category

              :

              item.category?.name || "Diğer";



            const date = new Date(

              item.date || item.createdAt

            );



            return (

            <div

              className="transaction"

              key={item.id || index}

            >



              <div className="transaction-left">



                <div className="transaction-icon">


                  {
                    item.isIncome
                    ?

                    "💰"

                    :

                    "💸"
                  }


                </div>





                <div>


                  <h4>

                    {item.description}

                  </h4>




                  <p>

                    {categoryName}

                    {" • "}

                    {
                      isNaN(date)

                      ?

                      "Tarih yok"

                      :

                      date.toLocaleDateString("tr-TR")

                    }


                  </p>



                </div>




              </div>







              <span

                className={

                  item.isIncome

                  ?

                  "income"

                  :

                  "expense"

                }


              >



                {

                  item.isIncome

                  ?

                  "+"

                  :

                  "-"

                }


                ₺

                {

                  Number(item.amount)

                  .toLocaleString("tr-TR")

                }



              </span>





            </div>

            );


          })


        )

      }



    </div>

  );

}



export default RecentTransactions;