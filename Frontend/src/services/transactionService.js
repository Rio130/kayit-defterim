import {
    getTransactions,
    createTransaction,
    deleteTransaction,
    updateTransaction
} from "./api";




// TÜM İŞLEMLER

export async function fetchTransactions(){

    try{

        const data = await getTransactions();

        return data;

    }
    catch(error){

        console.log(
            "İşlemler alınırken hata:",
            error
        );

        return [];

    }

}







// İŞLEM EKLE

export async function addTransaction(transaction){


    const data = await createTransaction(
        transaction
    );


    return data;


}







// İŞLEM SİL

export async function removeTransaction(id){


    const data = await deleteTransaction(id);


    return data;


}







// İŞLEM GÜNCELLE

export async function editTransaction(
    id,
    transaction
){


    const data = await updateTransaction(
        id,
        transaction
    );


    return data;


}