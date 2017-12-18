
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

var temps;




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
        n=Math.round(ordre.value);
        
        m=new Array(n);
        for (i=0;i<n;i++){
            m[i]=new Array(n);
        }
        
        b=new Array(n);
        x=new Array(n);
        y=new Array(n);
        
        string="<tr><th colspan="+n+">A</th><th>b</th></tr>";
        
       
        
        for (i=0;i<n;i++){
            string+="<tr>";
            for (j=0;j<n;j++){
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

        while(l<n && k <n){
            profil=[];
            var lig=l;
            var notfound=true;
            while (notfound && lig<n){
                if (m[lig][k]!=0){
                    profil.push(lig);
                    notfound=false;
                }
                lig++;
            }
            
        
            if (!notfound){
                if (profil[0]!=l){
                    for (i=0;i<n;i++){
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
    for (var i=0;i<n;i++){
        for (var j=0;j<n;j++){
            upper[i][j]=m[i][j];
        }
    }

    // L = I
    for (var i = 0; i < n; ++i){
        for (var j = 0; j < n; ++j){
            if (j != i){
                lower[i][j]=0;
            } else {
                lower[i][j]=1;
            }
        }
    }

    // Construction de L et U
    for (var k = 0; k < n; ++k){
        p = upper[k][k];
        for (var i = k+1; i < n; ++i){
            q = upper[i][k];
            upper[i][k] = 0;
            lower[i][k] = q/p;
            for (var j = k+1; j < n; ++j){
                upper[i][j] = upper[i][j] - ( ( q/p ) * upper[k][j]);
            }
        }
    }
}

// retourne vrai si la matrice en paramètre est symétrique, faux sinon
// param : matQ : matrice carrée
function isSymetric(matC){
    var sym = true;

    for (var i = 0; i < n; ++i){
        for (var j = 0; j < i; ++j){
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
    var u=new Array(matP.length); // matrice U
    for (i=0;i<matP.length;i++){
        u[i]=new Array(matP.length);
    }
    var det = 1; // retour de la fonction, le determinant de matP

    // Initialisation
    // U = A
    for (i=0;i<n;i++){
        for (j=0;j<n;j++){
            u[i][j]=matP[i][j];
        }
    }


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


document.getElementById("comparaison").onclick=function(){

    var size=100;
    temps=new Array(size);    


   
    for (var i=1;i<=size;i++){
        start=new Date();
        n=i*10;
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
        console.log(m);
        end=new Date();
        temps[i-1]=(end.getTime()-start.getTime());
    }

    console.log(temps);
    
}

function randomSymetric(nb){
    for (var i=0;i<nb;i++){
        for (var j=i;j<nb;j++){
            m[i][j]=Math.round(Math.random()*20);
            m[j][i]=m[i][j];
        }
        b[i]=Math.round(Math.random()*20);
    }
}

/*

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
*/