
var ordre=document.getElementById("ordre");
var ok=document.getElementById("okbutton");
var matrice=document.getElementById("matrice");
var string="";
var echelon=document.getElementById("echelon");
var possible=false;
var n=0;
var m;
var profildemescouilles=[];
var lignetemporaire=[];
var random=document.getElementById("random");
//génère les cases de la matrice 

ok.onclick=function(){
    if (ordre.value!=null && ordre.value<21){
        document.getElementById("random").disabled=false;
        m=new Array(ordre.value);
        for (i=0;i<ordre.value;i++){
            m[i]=new Array(ordre.value);
        }
        string="";
        n=ordre.value;
        for (i=0;i<ordre.value;i++){
            string+="<tr>";
            for (j=0;j<ordre.value;j++){
                string+="<td>";
                string+="<input type='number' id='"+i+","+j+"' value='0' class=mat onclick=this.select(); />";
                string+="</td>";
                
            }
            string+="</tr>";

        }
        matrice.innerHTML=string;
        possible=true;
    }
    
}


var l=0,k=0;

echelon.onclick=function(){
    for (i=0;i<n;i++){
        for (j=0;j<n;j++){
            m[i][j]=document.getElementById(i+","+j).value;
            
        }
    }


    
    
    while(possible && k <ordre.value){
        //recherche();
       
        
        
    }

    console.log(m);
}


function recherche(){
    var lig=l;
    var notfound=true;
    while (notfound && lig<ordre.value){
        if (m[lig][k]!=0){
            profildemescouilles.push(lig);
            notfound=false;
        }
        lig++;
    }
    

    if (!notfound){
        if (profildemescouilles[0]!=l){
            for (i=0;i<ordre.value;i++){
                lignetemporaire[i]=m[profildemescouilles[0]][i];
                m[profildemescouilles[0]][i]=m[l][i];
                m[l][i]=lignetemporaire[i];
            }
        }
    }
}


random.onclick=function(){
    var inputs=document.getElementsByClassName("mat");
    for (i=0;i<inputs.length;i++){
        inputs[i].value=Math.round((Math.random()-0.5)*20);
    }
}