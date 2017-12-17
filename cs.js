
var ordre=document.getElementById("ordre");
var ok=document.getElementById("okbutton");
var matrice=document.getElementById("matrice");
var string="";
var str2="";
var echelon=document.getElementById("echelon");
var possible=false;
var n=0;
var profil=[];
var m; // matrice A
var b; // matrice b
var lower; // matrice L
var upper; // matrice U
var lignetemporaire=[];
var random=document.getElementById("random");
var inputs=document.getElementsByClassName("mat");
var resoudre=document.getElementById("resoudre");
var x;//la solution sous forme de tableau
var y;//la solution y dans LUx=b telle que Ux=y => Ly=b
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
    if (ordre.value!=null){
        random.disabled=false;
        echelon.disabled=false;
        n=ordre.value;
        m=new Array(n);
        for (i=0;i<n;i++){
            m[i]=new Array(n);
        }
        
        b=new Array(n);
        x=new Array(n);
        y=new Array(n);
        
        string="<tr><th colspan="+n+">A</th><th>b</th></tr>";
        
       
        
        for (i=0;i<ordre.value;i++){
            string+="<tr>";
            for (j=0;j<ordre.value;j++){
                string+="<td><input type='number' id='"+i+","+j+"' value='0' class=mat onclick=this.select(); /></td>";
                
            }
            string+="<td><input type=number id='b"+i+"' value='0' class=matb onclick=this.select(); /></td></tr>";

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
var start,end;

echelon.onclick=function(){
    start=new Date();
    for (i=0;i<n;i++){
        for (j=0;j<n;j++){
            m[i][j]=document.getElementById(i+","+j).value;
        }
        b[i]=document.getElementById("b"+i).value;
    }
    document.getElementById("ixe").style.visibility="visible";
    document.getElementById("egal1").style.visibility="visible";
    document.getElementById("mata").style.visibility="visible";
    document.getElementById("matb").style.visibility="visible";

    
    switch(methode){
        
        case "gauss":
        
        document.getElementById("egal2").style.visibility="hidden";
        document.getElementById("egal2").style.position="absolute";
        document.getElementById("matl").style.visibility="hidden";
        document.getElementById("matu").style.visibility="hidden";
        document.getElementById("matl").style.position="absolute";
        document.getElementById("matu").style.position="absolute";
        document.getElementById("ixe2").style.visibility="hidden";
        document.getElementById("ixe2").style.position="absolute";
        
        l=0;
        k=0;

        while(l<ordre.value && k <ordre.value){
            profil=[];
            var lig=l;
            var notfound=true;
            while (notfound && lig<ordre.value){
                if (m[lig][k]!=0){
                    profil.push(lig);
                    notfound=false;
                }
                lig++;
            }
            
        
            if (!notfound){
                if (profil[0]!=l){
                    for (i=0;i<ordre.value;i++){
                        lignetemporaire[i]=m[profil[0]][i];
                        m[profil[0]][i]=m[l][i];
                        m[l][i]=lignetemporaire[i];
                    }
                }
                    
                    
                for (i=l+1;i<n;i++){
                    
                    var facteur=m[i][k]/m[l][k];
                    m[i][k]=0;
                    for (j=k+1;j<n;j++){
                        m[i][j]-=facteur*m[l][j];
                    }
                    b[i]-=facteur*b[l];
                }
    
                l++;
                
               
            }
            k++;
        }

        
        
        break;

        case "lu":
        document.getElementById("matl").style.position="relative";
        document.getElementById("matu").style.position="relative";
        document.getElementById("matl").style.visibility="visible";
        document.getElementById("matu").style.visibility="visible";

        document.getElementById("egal2").style.position="relative";
        document.getElementById("egal2").style.visibility="visible";
        document.getElementById("ixe2").style.visibility="visible";
        document.getElementById("ixe2").style.position="relative";


        //Initialisation des matrices l et u
        lower=new Array(n);
        for (i=0;i<n;i++){
            lower[i]=new Array(n);
        }
        upper=new Array(n);
        for (i=0;i<n;i++){
            upper[i]=new Array(n);
        }

        transfoLU();


            var str="";
            for (i=0;i<n;i++){
                str+="<tr>";
                for (j=0;j<n;j++){
                    str+="<td><label>"+String(lower[i][j]).substring(0,6)+"</label></td>";
                    
                }
                str+="</tr>";
            }


            document.getElementById("matl").innerHTML=str;

            str="";
            for (i=0;i<n;i++){
                str+="<tr>";
                for (j=0;j<n;j++){
                    str+="<td><label>"+String(upper[i][j]).substring(0,6)+"</label></td>";
                    
                }
                str+="</tr>";
            }
            document.getElementById("matu").innerHTML=str;
        break;
        
        
    }
    

    //Ici, on affiche les matrices après l'échelonnement/factorisation
    var strx="";
    var str="";
    var strb="";
    for (i=0;i<n;i++){
        strx+="<td><label>x"+(i+1)+"</label></td>";
        str+="<tr>";
        strb+="<tr><td><label id='mb"+i+"'>"+String(b[i]).substr(0,6)+"</label></td></tr>";
        for (j=0;j<n;j++){
            str+="<td><label id='a"+i+","+j+"'>"+String(m[i][j]).substr(0,6)+"</label></td>";
            
        }
        str+="</tr>";
    }

    end=new Date();
    console.log(end.getTime() - start.getTime()+"ms");

    document.getElementById("mata").innerHTML=str;
    document.getElementById("matb").innerHTML=strb;
    document.getElementById("ixe").innerHTML=strx;
    document.getElementById("ixe2").innerHTML=strx;

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
    switch(methode){
        case "gauss":
        solution(0);
        var s="";
        for (i=0;i<x.length;i++){
            s+="<tr><td>x"+(i+1)+" = </td><td>"+x[i]+"</td></tr>"
        }
        document.getElementById("x").innerHTML=s;
        break;
        case "lu":
        solutionY(n-1);
        solutionX(0);
        var s="";
        for (i=0;i<x.length;i++){
            s+="<tr><td>x"+(i+1)+" = </td><td>"+x[i]+"</td></tr>"
        }
        document.getElementById("x").innerHTML=s;
        break;
        case "cholesky":
        break;
    }
    
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

function solutionY(num){
    if (num==0){
        y[num]=b[num]/lower[num][num];
        return y[num];
    }else{
        y[num]=b[num];
        for (i=0;i<num;i++){
            y[num]-=lower[num][i]*solutionY(i);
        }
        y[num]/=lower[num][num];
        return y[num];
    }
}

function solutionX(num){
    if (num==n-1){
        x[num]=y[num]/upper[num][num];
        return x[num];
    }else{
        x[num]=y[num];
        for (i=num+1;i<n;i++){
            x[num]-=upper[num][i]*solutionX(i);
        }
        x[num]/=upper[num][num];
        return x[num];
    }
}

// a lancer ssi echelonnée
// décompose la matrice matP en lower et upper
function transfoLU(){
    // variables locales
    var p; // pivot
    var q; // qivot

    // Initialisation
    // U = A
    for (i=0;i<n;i++){
        for (j=0;j<n;j++){
            upper[i][j]=m[i][j];
        }
    }

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
            for (j = k+1; j < n; ++j){
                upper[i][j] = upper[i][j] - ( ( q/p ) * upper[k][j]);
            }
        }
    }
}

// retourne vrai si la matrice en paramètre est symétrique, faux sinon
// param : matQ : matrice carrée
function isSymetric(matC){
    var sym = true;

    for (i = 0; i < n; ++i){
        for (j = 0; j < i; ++j){
            if(matC[i][j] != matC[j][i]){
                sym = false;
            }
        }
    }

    return sym;
}


// retourne le déterminant d'une matrice à partir de la U de sa décomposition LU
// va être utile pour verifier si definie positive
// param : matP : une matrice carree
function calcDetByLU(matP){
    // variables locales
    var p; // pivot
    var q; // qivot
    var u; // matrice U
    var det = 1; // retour de la fonction, le determinant de matP

    // Initialisation
    // U = A
    u = matP;

    // Construction de L et U
    for (k = 0; k < n; ++k){
        p = u[k][k];
        for (i = k+1; i < n; ++i){
            q = u[i][k];
            u[i][k] = 0;
            for (j = k+1; j < n; ++j){
                u[i][j] = u[i][j] - ( ( q/p ) * u[k][j]);
            }
        }
    }

    // Calcul du déterminant
    for (i = 0 ; i < n; ++i){
        det *= u[i][i];
    }

    return det;
}