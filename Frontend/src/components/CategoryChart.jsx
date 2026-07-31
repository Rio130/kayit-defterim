import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";



function CategoryChart({transactions = []}){



  const expenseTransactions = transactions.filter(

    item => item.isIncome === false

  );




  const categoryData = {};




  expenseTransactions.forEach(item=>{


    const categoryName =

      typeof item.category === "string"

      ?

      item.category

      :

      item.category?.name || "Diğer";




    const amount = Number(item.amount);



    if(categoryData[categoryName]){


      categoryData[categoryName] += amount;


    }

    else{


      categoryData[categoryName] = amount;


    }



  });






  const data = Object.keys(categoryData).map(category=>({


    name:category,

    value:categoryData[category]


  }));






  const COLORS = [

    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#22c55e"

  ];





  const total = data.reduce(

    (acc,item)=>

      acc + Number(item.value),

    0

  );







return(


<div className="category-box">


<div className="chart-header">


<h2>
Gider Dağılımı
</h2>


<p>
Kategorilere göre harcama
</p>


</div>





{

data.length === 0 ?


(

<p>
Henüz gider bulunmuyor.
</p>

)


:


(


<>


<div className="pie-wrapper">


<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>



<Pie


data={data}


dataKey="value"


nameKey="name"


cx="50%"


cy="50%"


innerRadius={65}


outerRadius={100}


paddingAngle={5}


stroke="none"



>


{

data.map((item,index)=>(


<Cell

key={index}

fill={

COLORS[index % COLORS.length]

}


/>


))


}



</Pie>





<Tooltip

formatter={(value)=>

`₺${Number(value).toLocaleString("tr-TR")}`

}

/>



</PieChart>



</ResponsiveContainer>



</div>







<div className="total-expense">


<h3>

₺{total.toLocaleString("tr-TR")}

</h3>



<p>
Toplam Gider
</p>


</div>


</>


)


}



</div>


);



}



export default CategoryChart;