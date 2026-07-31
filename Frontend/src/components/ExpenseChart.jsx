import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";



function ExpenseChart({transactions = []}){


  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
  ];



  const data = months.map((month,index)=>{


    const total = transactions

      .filter(item=>{


        const transactionDate = new Date(
          item.date || item.createdAt
        );


        return (

          transactionDate.getMonth() === index

          &&

          item.isIncome === false

        );


      })


      .reduce(

        (sum,item)=>

          sum + Number(item.amount),

        0

      );




    return {

      name:month,

      gider:total

    };


  });







return(


<div className="chart-box">



<div className="chart-header">


<h2>
Aylık Gider Grafiği
</h2>


<p>
Gerçek harcama analizi
</p>


</div>





<ResponsiveContainer width="100%" height={330}>


<LineChart data={data}>


<CartesianGrid
strokeDasharray="5 5"
/>



<XAxis

dataKey="name"

axisLine={false}

tickLine={false}

/>



<YAxis

axisLine={false}

tickLine={false}

/>




<Tooltip

formatter={(value)=>

`₺${Number(value).toLocaleString("tr-TR")}`

}

/>




<Line

type="monotone"

dataKey="gider"

stroke="#6366f1"

strokeWidth={4}

dot={{

r:5

}}


/>



</LineChart>


</ResponsiveContainer>




</div>


);


}



export default ExpenseChart;
