
var ordre=document.getElementById("ordre");
var ok=document.getElementById("okbutton");
var matrice=document.getElementById("matrice");
var string="";
var str2="";
var echelon=document.getElementById("echelon");
var possible=false;
var n=0;
var m; // matrice A
var b; // matrice b
var lower; // matrice L
var upper; // matrice U
var profildemescouilles=[];
var lignetemporaire=[];
var random=document.getElementById("random");
var inputs=document.getElementsByClassName("mat");
var resoudre=document.getElementById("resoudre");
var x;//la solution sous forme de tableau
var radios=document.getElementsByName("methode");
var methode="gauss";






for (i=0;i<radios.length;i++){
    radios[i].onclick=function(event){
        changeMethod(event);
    }
}


function changeMethod(event){
    methode=event.target.value;
    switch(methode){
        case "gauss":
            echelon.value="Échelonner";
        break;
        case "lu":case "cholesky":
            echelon.value="Factoriser";
        break;
        
    }
}


//génère les cases de la matrice 

ok.onclick=function(){
    if (ordre.value!=null && ordre.value<21){
        random.disabled=false;
        echelon.disabled=false;
        m=new Array(ordre.value);
        for (i=0;i<ordre.value;i++){
            m[i]=new Array(ordre.value);
        }
        b=new Array(ordre.value);
        x=new Array(ordre.value);
        string="<tr><th colspan=3>A</th><th>b</th></tr>";
        n=ordre.value;
       
        
        for (i=0;i<ordre.value;i++){
            string+="<tr>";
            for (j=0;j<ordre.value;j++){
                string+="<td><input type='number' id='"+i+","+j+"' value='0' class=mat onclick=this.select(); /></td>";
                
            }
            string+="<td><input type=number id='b"+i+"' value='0' class=matb /></td></tr>";

        }
        matrice.innerHTML=string;

        possible=true;

        //Quand on laisse une case vide, la valeur 0 lui est attribuée -> c'est simplement pour éviter d'avoir à gérer les cas où on clique sur échelonner alors que des valeurs ne sont pas renseignées
        for (i=0;i<inputs.length;i++){
            inputs[i].onblur=function(){
                if (this.value==""){
                    this.value=0;
                }
            }
        }
    }
    
}


var l=0,k=0;

echelon.onclick=function(){
    switch(methode){
        case "gauss":
        l=0;
        k=0;
        for (i=0;i<n;i++){
            for (j=0;j<n;j++){
                m[i][j]=document.getElementById(i+","+j).value;
            }
            b[i]=document.getElementById("b"+i).value;
        }
        
    
        
        
        while(l<ordre.value && k <ordre.value){
            profildemescouilles=[];
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
                    
                    
                for (i=l+1;i<n;i++){
                    var facteur=m[i][k]/m[l][k];
                    for (j=k;j<n;j++){
                        m[i][j]-=facteur*m[l][j];
                    }
                    b[i]-=facteur*b[l];
                }
    
                l++;
                
               
            }
            k++;
    
            
           
            
            
        }
        for (i=0;i<m.length;i++){
            for (j=0;j<m.length;j++){
                document.getElementById(i+","+j).value=m[i][j];
            }
        }
        for (i=0;i<b.length;i++){
            document.getElementById("b"+i).value=b[i];
        }

        break;

        case "lu":

        break;

    }
    



    resoudre.disabled=false;
    
}



random.onclick=function(){
    for (i=0;i<inputs.length;i++){
        inputs[i].value=Math.round((Math.random()-0.5)*20);
    }
    var inputsb=document.getElementsByClassName("matb");
    for (i=0;i<inputsb.length;i++){
        inputsb[i].value=Math.round((Math.random()-0.5)*20);
    }
}



resoudre.onclick=function(){
    solution(0);
    console.log(x);
    var s="";
    for (i=0;i<x.length;i++){
        s+="<tr><td>x"+(i+1)+" = </td><td>"+x[i]+"</td></tr>"
    }
    document.getElementById("x").innerHTML=s;
}

function solution(num){
    if (num==n-1){
        x[num]=b[num]/m[num][num];
        return x[num];
    }else{
        x[num]=b[num];
        for (i=num+1;i<n;i++){
            x[num]-=m[num][i]*solution(i);
        }
        x[num]/=m[num][num];
        return x[num];
    }
    
}

// a lancer ssi echelonnée
function transfoLU(){
    // variables locales
    var p; // pivot
    var q; // qivot

    // Initialisation
    // U = A
    upper = m;

    // L = I
    for (i = 0; i < n; ++i){
        for (j = 0; j < n; ++j){
            if (j != i){
                lower[i][j]=0;
            } else {
                lower[i][j]=1;
            }
        }
    }

    // Construction de L et U
    for (k = 0; k < n; ++k){
        p = upper[k][k];
        for (i = k+1; i < n; ++i){
            q = upper[i][k];
            upper[i][k] = 0;
            lower[i][k] = q/p;
        }
    }

}