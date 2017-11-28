
var ordre=document.getElementById("ordre");
var ok=document.getElementById("okbutton");
var matrice=document.getElementById("matrice");
var string="";

//génère les cases de la matrice 

ok.onclick=function(){
    if (ordre.value!=null){
        string="";

        for (i=0;i<ordre.value;i++){
            string+="<tr>";
            for (j=0;j<ordre.value;j++){
                string+="<td>";
                string+="<input type='number' id='"+i+","+j+"' value=0 />";
                string+="</td>";
            }
            string+="</tr>";

        }
        matrice.innerHTML=string;

    }
    
}