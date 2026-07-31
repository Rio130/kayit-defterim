import { NavLink } from "react-router-dom";


function Sidebar(){


  const user = JSON.parse(
    localStorage.getItem("user")
  );



  return(


    <aside className="sidebar">



      <div className="logo">


        <h2>
          💰 Bütçe Takip
        </h2>


        <p>
          Finans yönetimi
        </p>


      </div>





      <nav>


        <ul>


          <li>

            <NavLink to="/">

              <span>🏠</span>

              Ana Sayfa

            </NavLink>

          </li>




          <li>

            <NavLink to="/islemler">

              <span>💸</span>

              İşlemler

            </NavLink>

          </li>





          <li>

            <NavLink to="/istatistikler">

              <span>📊</span>

              İstatistikler

            </NavLink>

          </li>





          <li>

            <NavLink to="/kategoriler">

              <span>📂</span>

              Kategoriler

            </NavLink>

          </li>





        </ul>


      </nav>








      <div className="sidebar-user">



        <div className="avatar">


          {
            user?.fullName
            ? user.fullName.charAt(0).toUpperCase()
            : "U"
          }


        </div>





        <div>


          <h4>


            {
              user?.fullName
              || "Kullanıcı"
            }


          </h4>


          <p>
            Yazılım Geliştirici
          </p>


        </div>



      </div>





    </aside>


  );


}



export default Sidebar;