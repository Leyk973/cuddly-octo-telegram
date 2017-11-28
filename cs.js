
var ordre=document.getElementById("ordre");
var ok=document.getElementById("okbutton");
var matrice=document.getElementById("matrice");
var string="";
var ech=document.getElementById("echelon");
var possible = false;

//génère les cases de la matrice 

ok.onclick=function(){
    if (ordre.value!=null && ordre.value<21){
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
        possible=true;
    }
    
}

var tableauTemp; // deja declaree et passee avant
var k=0,l=0;
// tableau
var profil, prochainIndiceProfil=0;
// recherche de l'ordre des lignes pour echelonnement
ech.onclick=function(){    
    var col = k;
    while(possible && col <= ordre.value){        
        
        var lig = l;
        // tant que pas trouve le pivot DANS LA COLONNE 
        var notfound = true;
        while (notfound && lig <= ordre.value) {
            if(tableauTemp[l][k] != 0){
                profil[prochainIndiceProfil]=lig;
                ++prochainIndiceProfil;
                notfound=false;






            }
            ++lig;
        }
        ++col;
    }
}