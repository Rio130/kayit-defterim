function Header() {


  const user = JSON.parse(
    localStorage.getItem("user")
  );



  return (


    <header className="header">



      <div className="search-box">


        <span className="search-icon">

          🔍

        </span>




        <input

          type="text"

          placeholder="İşlem ara..."

        />


      </div>









      <div className="header-right">



        <button
          className="notification"
          title="Bildirimler"
        >

          🔔

        </button>









        <div className="profile-card">



          <div className="avatar">


            {
              user?.fullName
              ? user.fullName.charAt(0).toUpperCase()
              : "U"
            }


          </div>








          <div className="profile-info">


            <h4>


              {
                user?.fullName
                || "Kullanıcı"
              }


            </h4>



            <p>

              Finans Paneli

            </p>


          </div>





        </div>





      </div>





    </header>


  );


}


export default Header;
