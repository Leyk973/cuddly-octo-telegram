
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
var determiner=document.getElementById("calcDet");
var inverser=document.getElementById("calcInv");
var matInv; // matrice inverse de A
var detrmnt; // determinant de A
var matini; // matrice initiale (pour calcul determinant/inverse)
var temps;
var start, end;



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
        determiner.disabled=false;
        n=Math.round(ordre.value);
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
        strx+="<tr><td><label>x"+(i+1)+"</label></td></tr>";
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
        solutionIterative();
        var s="";
        for (i=0;i<x.length;i++){
            s+="<tr><td>x"+(i+1)+" = </td><td>"+x[i]+"</td></tr>"
        }
        document.getElementById("x").innerHTML=s;
        break;
        case "lu":
        solutionIterativeY();
        solutionIterativeX();
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

function solutionIterative(){
    for (var i=n-1;i>=0;i--){
        x[i]=b[i];
        for (var j=i+1;j<n;j++){
            x[i]-=m[i][j]*x[j];
        }
        x[i]/=m[i][i];
    }
}


function solutionIterativeY(){
    for (var i=0;i<n;i++){
        y[i]=b[i];
        for (var j=0;j<i;j++){
            y[i]-=lower[i][j]*y[j];
        }
    }
}

function solutionIterativeX(){
    for (var i=n-1;i>=0;i--){
        x[i]=y[i];
        for (var j=i+1;j<n;j++){
            x[i]-=upper[i][j]*x[j];
        }
        x[i]/=upper[i][i];
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
// param : np : ordre de la matrice en question
function calcDetByLU(matP,nP){
    // variables locales
    var p; // pivot
    var q; // qivot
    var u; // matrice U
    var det = 1; // retour de la fonction, le determinant de matP

// teststgtssttstst for debug
    var iniI = i;
    var iniJ = j;

    // Initialisation
    // U = A
    var matu;
    matu = new Array(nP);
    for (i=0;i<nP;i++){
        matu[i]=new Array(nP);
    }
    for (i=0;i<nP;++i){
        for (j=0;j<nP;++j){
            matu[i][j]=matP[i][j];
        }
    }
    //var u = matu;

    //var u = matP;

    // Construction de L et U
    for (k = 0; k < nP; ++k){
        p = matu[k][k];
        for (i = k+1; i < nP; ++i){
            q = matu[i][k];
            matu[i][k] = 0;
            for (j = k+1; j < nP; ++j){
                matu[i][j] = matu[i][j] - ( ( q/p ) * matu[k][j]);
            }
        }
    }

    // Calcul du déterminant
    for (i = 0 ; i < nP; ++i){
        det *= matu[i][i];
    }

    i= iniI;
    j= iniJ;
    return det;
}

determiner.onclick=function(){  
    matini=new Array(n);
    for (i=0;i<n;i++){
        matini[i]=new Array(n)
    }
    for (i=0;i<n;i++){
        for (j=0;j<n;j++){
            matini[i][j]=document.getElementById(i+","+j).value;
        }
    }

//debug afficahge matini
/*console.log("dans determiner AVANT deter matini");
for (di=0;di<n;++di){
    for (dj=0;dj<n;++dj){
        console.log("matini("+di+","+dj+")="+matini[di][dj]);
    }
}*/

    detrmnt = calcDetByLU(matini,n);

//debug afficahge matini
/*console.log("dans determiner APRES deter matini");
for (di=0;di<n;++di){
    for (dj=0;dj<n;++dj){
        console.log("matini("+di+","+dj+")="+matini[di][dj]);
    }
}*/
    console.log("determinant de A : " + detrmnt);
    if ((detrmnt != 0) && (detrmnt != null)){
        inverser.disabled=false;
    }
}


//ne pas oublier la puissance de -1
inverser.onclick=function(){
    if ((detrmnt == 0)  || (isNaN(detrmnt))){
        console.log("determinant de A nul : matrice non inversible");
    } else if (detrmnt == null){
        console.log("veuillez d'abord calculer le determinant");
    } else {
        console.log("calcul de l'inverse");
        // initialisation de la matrice adjointe
        var matAdj;
        matAdj=new Array(n);
        for (i=0;i<n;i++){
            matAdj[i]=new Array(n)
        }
        // calcul des coefficients de adj
        var sousMat;
        sousMat=new Array(n-1);
        for (i=0;i<n-1;i++){
            sousMat[i]=new Array(n-1)
        }

//debug afficahge matini
for (di=0;di<n;++di){
    for (dj=0;dj<n;++dj){
        console.log("matini("+di+","+dj+")="+matini[di][dj]);
    }
}

        var cofi, cofj;

        for (i=0;i<n;i++){
            console.log("dansI---"+i+" n vaut ---" + n);
            for (j=0;j<n;++j){
                console.log("dansJ---"+i+"/"+j+"---");
                //sous matrice
                cofi=0;
                for (inti=0;inti<n;++inti){
                    if (inti != i){ // ligne a prendre en compte pour le calcul du cofacteur
                        cofj=0;
                        for (intj=0;intj<n;++intj){
                            if(intj != j){ // colonne a prendre en compte pour le calcul du cofacteur
                                sousMat[cofi][cofj]=matini[inti][intj];
                                ++cofj;
                            }
                        }
                        ++cofi;
                    }                    
                }
                
                console.log("---"+i+"/"+j+"---");
                //debug afficahge sousmat
                for (di=0;di<n-1;++di){
                    for (dj=0;dj<n-1;++dj){
                        console.log("sousmat["+i+j+"]("+di+","+dj+")="+sousMat[di][dj]);
                    }
                }


                // deter sous mat
                matAdj[i][j] = Math.pow(-1,i+j);
                matAdj[i][j] *= calcDetByLU(sousMat,n-1);
                console.log("matAdj("+i+","+j+") = "+matAdj[i][j]);
            }
            console.log("FIN I ---"+i+" n vaut ---" + n);
            console.log("FIN I2 ---"+i+" n vaut ---" + n);
        }

        // passage a la transposée
        // matInv <- tr(adj)
        // matInv *= 1/det
    }

}



document.getElementById("comparaison").onclick=function(){
    
        var size=100;
        temps=new Array(size);
        var labels=new Array(size);
    
    
        for (var i=1;i<=size;i++){

            start=new Date();

            n=i*10;
            labels[i-1]=String(n);
            m=new Array(n);
            for (var j=0;j<n;j++){
                m[j]=new Array(n);
            }
            b=new Array(n);
            x=new Array(n);
            y=new Array(n);
    
            lower=new Array(n);
            for (var j=0;j<n;j++){
                lower[j]=new Array(n);
            }
            upper=new Array(n);
            for (var j=0;j<n;j++){
                upper[j]=new Array(n);
            }
    
            randomSymetric(n);
    
            transfoLU();
            solutionIterativeY();
            solutionIterativeX();

            end=new Date();
            temps[i-1]=(end.getTime()-start.getTime());
        }
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            
            data: {
                labels: labels,
                datasets:[{
                    data:temps,
                    label: "LU",
                    borderColor: 'red'
                }]  
            },
            options: {
                responsive:false
            }
        });
        
    
    }
    
    function randomSymetric(nb){
        var r=new Array(nb);
        for (var i=0;i<nb;i++){
            r[i]=new Array(nb);
        }
        for (var i=0;i<nb;i++){
            for (var j=i;j<nb;j++){
                r[i][j]=Math.round(Math.random()*3);
                r[j][i]=r[i][j];
            }
            b[i]=Math.round(Math.random()*3);
        }
        console.log(r);
        for (var i=0;i<nb;i++){
            for (var j=0;j<nb;j++){
                m[i][j]=0;
                for (var k=0;k<nb;k++){
                    m[i][j]+=r[i][k]*r[k][j];
                }
            }
        }
        console.log(m);
    }

    