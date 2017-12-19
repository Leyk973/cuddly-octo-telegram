
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
var start, end;
var matlchol;// matrice L de Cholesky

document.getElementById("gauss").checked=true;

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
    n=document.getElementById("ordre").value;
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

        determiner.disabled=false;
        

        transfoLU();


            var str="";
            for (var i=0;i<n;i++){
                str+="<tr>";
                for (var j=0;j<n;j++){
                    str+="<td><label>"+String(lower[i][j]).substring(0,6)+"</label></td>";
                    
                }
                str+="</tr>";
            }


            document.getElementById("matl").innerHTML=str;

            str="";
            for (var i=0;i<n;i++){
                str+="<tr>";
                for (var j=0;j<n;j++){
                    str+="<td><label>"+String(upper[i][j]).substring(0,6)+"</label></td>";
                    
                }
                str+="</tr>";
            }
            document.getElementById("matu").innerHTML=str;
        break;
        
        case "cholesky":
            if (isSymetric(m)) {
                document.getElementById("matl").style.position = "relative";
                document.getElementById("matu").style.position = "relative";
                document.getElementById("matl").style.visibility = "visible";
                document.getElementById("matu").style.visibility = "visible";

                document.getElementById("egal2").style.position = "relative";
                document.getElementById("egal2").style.visibility = "visible";
                document.getElementById("ixe2").style.visibility = "visible";
                document.getElementById("ixe2").style.position = "relative";




                //factoCholesky();
                
                matlchol = ghcholesky(m);
                for (var hi = 0; hi<n; ++hi){
                    for (var hj = 0; hj<n; ++hj){
                        if(!(matlchol[hi][hj])){
                            matlchol[hi][hj]=0;
                        }
                    }
                }




                str = "";
                for (i = 0; i < n; i++) {
                    str += "<tr>";
                    for (j = 0; j < n; j++) {
                        str += "<td><label>" + String(matlchol[i][j]).substring(0, 6) + "</label></td>";

                    }
                    str += "</tr>";
                }
                document.getElementById("matl").innerHTML = str;
                str = "";
                for (i = 0; i < n; i++) {
                    str += "<tr>";
                    for (j = 0; j < n; j++) {
                        str += "<td><label>" + String(matlchol[j][i]).substring(0, 6) + "</label></td>";
    
                    }
                    str += "</tr>";
                }
    
                document.getElementById("matu").innerHTML = str;
            }else{
                window.alert("La matrice n'est pas symétrique.");
            }

            

            break;
    }

    //Ici, on affiche les matrices après l'échelonnement/factorisation
    var strx="";
    var strr="";
    var strb="";
    for (var i=0;i<n;i++){
        strx+="<tr><td><label>x"+(i+1)+"</label></td></tr>";
        strr+="<tr>";
        strb+="<tr><td><label id='mb"+i+"'>"+String(b[i]).substr(0,6)+"</label></td></tr>";
        for (var j=0;j<n;j++){
            strr+="<td><label id='a"+i+","+j+"'>"+String(m[i][j]).substr(0,6)+"</label></td>";
            
        }
        strr+="</tr>";
    }


    document.getElementById("mata").innerHTML=strr;
    document.getElementById("matb").innerHTML=strb;
    document.getElementById("ixe").innerHTML=strx;
    document.getElementById("ixe2").innerHTML=strx;

    resoudre.disabled=false;
    
}

function ghcholesky(matrix) {
	var len = matrix.length, res = Array(len);
	if (matrix.length !== matrix[len-1].length) throw Error('Input matrix must be square or lower triangle');
	res[0] = [Math.sqrt( matrix[0][0] )];
	for (var i = 1; i<len; ++i) {
		res[i] = Array(i+1); // lower triangle
		for (var j = 0; j < i; ++j) {
			res[i][j] = delta(matrix[i][j], res, i, j) / res[j][j];
		}
		res[i][i] = Math.sqrt(delta(matrix[i][i], res, i, i));
	}
	return res;
}

function delta(aij, res, i, j) {
	for (var k=0, sum=aij; k<j; ++k) if (res[i][k]) sum -= res[i][k] * res[j][k];
	return sum;
}







function factoCholesky(){
    var somme;
    // récupération de la matrice initiale
    
    matlchol = new Array(n);
    for (var ci=0;ci<n;ci++){
        matlchol[ci] = new Array(n);
    }

    for (var ci=0; ci<n; ci++){
        for(var cj=0; cj<n; cj++){
            matlchol[ci][cj]=0;
        }
    }
    //algo d'André-Louis
    matlchol[0][0] = Math.sqrt(m[0][0]);
    for (var cj=1; cj<n; cj++){
        matlchol[cj][0] = m[cj][0] / matlchol[0][0];
    }
    for (var ci=1; ci<n-1; ci++){
        somme = 0;
        for (var ck=0; ck<ci-1; ck++){
            somme += matlchol[ci][ck] * matlchol[ci][ck];
        }
        matlchol[ci][ci] = Math.sqrt(m[ci][ci] - somme);
        for (var cj=ci+1; cj<n; cj++){
            somme=0;
            for (var ck=0; ck<(ci-1); ck++){
                somme+=(matlchol[cj][ck] * matlchol[ci][ck]);
            }
            matlchol[cj][ci]= (m[cj][ci] - somme) / matlchol[ci][ci];
        }
    }
    matlchol[n-1][n-1] = Math.sqrt(m[n-1][n-1] - somme);
}



random.onclick=function(){
    if (methode!="cholesky"){
        for (i=0;i<inputs.length;i++){
            inputs[i].value=Math.round((Math.random()-0.5)*20);
        }
        var inputsb=document.getElementsByClassName("matb");
        for (i=0;i<inputsb.length;i++){
            inputsb[i].value=Math.round((Math.random()-0.5)*20);
        }
    }else{
        randomSymetric(n);
        for (var i=0;i<n;i++){
            for (var j=0;j<n;j++){
                document.getElementById(i+","+j).value=m[i][j];
            }
            document.getElementById("b"+i).value=b[i];
        }
    }
    
}


function déterminerledéterminant(){
    var res=1;
    for (var i=0;i<n;i++){
        res*=upper[i][i];
    }
    return res;
}


resoudre.onclick=function(){
    switch(methode){
        case "gauss":
        solutionIterative();
        if (pasdesolution){
            window.alert("Pas de solution.");
        }else{
            var s="";
            for (i=0;i<n;i++){
                s+="<tr><td>x"+(i+1)+" = </td><td>"+x[i]+"</td></tr>"
            }
            document.getElementById("x").innerHTML=s;
        }
        
        break;
        case "lu":
        solutionIterativeY();
        solutionIterativeX();
        if (pasdesolution){
            window.alert("Pas de solution.");
        }else{
            var s="";
            for (i=0;i<n;i++){
                s+="<tr><td>x"+(i+1)+" = </td><td>"+x[i]+"</td></tr>"
            }
            document.getElementById("x").innerHTML=s;
        }
        
        break;
        case "cholesky":
        solutionCholesky();
        if (pasdesolution){
            window.alert("Pas de solution.");
        }else{
            var s="";
            for (i=0;i<n;i++){
                s+="<tr><td>x"+(i+1)+" = </td><td>"+x[i]+"</td></tr>"
            }
            document.getElementById("x").innerHTML=s;
        }
        break;
    }

}
function solutionCholesky(){
    pasdesolution=false;
    for (var i=0;i<n;i++){
        y[i]=b[i];
        for (var j=0;j<i;j++){
            y[i]-=matlchol[i][j]*y[j];
        }
        if (matlchol[i][i]!=0){
            y[i]/=matlchol[i][i];
        }else{
            pasdesolution=true;
        }
    }
    for (var i=n-1;i>=0;i--){
        x[i]=y[i];
        for (var j=i+1;j<n;j++){
            x[i]-=matlchol[j][i]*x[j];
        }
        if (matlchol[i][i]!=0){
            x[i]/=matlchol[i][i];
        }else{
            pasdesolution=true;
        }
        
    }
}


var pasdesolution;
function solutionIterative(){
    pasdesolution=false;
    for (var i=n-1;i>=0;i--){
        x[i]=b[i];
        for (var j=i+1;j<n;j++){
            x[i]-=m[i][j]*x[j];
        }
        if (m[i][i]!=0){
            x[i]/=m[i][i];
        }else{
            pasdesolution=true;
        }
        
    }
}


function solutionIterativeY(){
    pasdesolution=false;
    for (var i=0;i<n;i++){
        y[i]=b[i];
        for (var j=0;j<i;j++){
            y[i]-=lower[i][j]*y[j];
        }
    }
}

function solutionIterativeX(){
    pasdesolution=false;
    for (var i=n-1;i>=0;i--){
        x[i]=y[i];
        for (var j=i+1;j<n;j++){
            x[i]-=upper[i][j]*x[j];
        }
        if (upper[i][i]!=0){
            x[i]/=upper[i][i];
        }else{
            pasdesolution=true;
        }
        
    }
}

// décompose la matrice matP en lower et upper
function transfoLU(){
    // variables locales
    var p; // pivot
    var q; // qivot

    //Initialisation des matrices l et u
    lower=new Array(n);
    for (i=0;i<n;i++){
        lower[i]=new Array(n);
    }
    upper=new Array(n);
    for (i=0;i<n;i++){
        upper[i]=new Array(n);
    }
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
    var pivNotFound = false;

    for (k = 0; k < n; ++k) {
        p = upper[k][k];
        /// SI P!=0
        if (p != 0) {
            for (i = k + 1; i < n; ++i) {
                q = upper[i][k];
                upper[i][k] = 0;
                lower[i][k] = q / p;
                for (j = k + 1; j < n; ++j) {
                    upper[i][j] = upper[i][j] - ((q / p) * upper[k][j]);
                }
            }
        } else {
            // recherche d'un pivot positif
            pivNotFound = true;
            for (var r = k+1; r < n; ++r){
                if (upper[r][k] != 0){
                    pivNotFound=false;
                    
                }
            }

            /// SI P = 0 : permutation dans L, U et b
        }
}}

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


function calcDet(matP,nP){
    var ma, deter=1,piv=-1, temp,aij,ajj;
    ma = new Array(nP);
    //console.log("merdumus : "+deter+"   "+matP[0][0]+"   "+matP[n-1][n-1]);
    
    for (var i=0;i<nP;i++){
        ma[i]=new Array(nP);
    }
    for (var i=0;i<nP;++i){
        for (var j=0;j<nP;++j){
            ma[i][j]=matP[i][j];
        }
    }

    //console.log("merdum : "+deter+"   "+ma[0][0]+"   "+ma[n-1][n-1]);

    var detnul = false;
    for (var j = 0; j < n - 1; ++j) {
        if (!detnul) {
            // si ajj = 0
            if (ma[j][j] == 0) {
                detnul = true;
                for (var i = j + 1; i < n; ++i) {
                    if (ma[i][j] != 0) {
                        // recherche du pivot eventuel
                        if (piv==-1){
                            piv = i;
                        }
                        detnul = false;
                    }
                }
                if (!detnul) {
                    for (var k = 0; k<n; ++k){
                        ma[piv][k] *= -1;
                    }
                    // permutation
                    for (var i=0;i<n;i++){
                        temp=ma[piv][i];
                        ma[piv][i]=ma[j][i];
                        ma[j][i]=temp;
                    }
                }
            // si ajj != 0
            } else {
                for (var i = j+1; i < n;++i){
                    // ajout a la ieme ligne
                    ajj=ma[j][j];
                    for (var k=0;k<n;k++){
                        aij=ma[i][j];
                        ma[i][k] -= (aij/ajj) * ma[j][k];
                    }
                    deter *= ma[j][j];
                }
            }
        }
    }
    if (detnul){
        deter = 0;
    } else {
        deter *= ma[n-1][n-1];
    }
    //console.log("merde: "+deter+"   "+ma[0][0]+"   "+ma[n-1][n-1]);
    return (deter);
}


/*
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
        console.log("boucle : "+i+"  "+matu[i][i]);
        det *= matu[i][i];
    }
    console.log("debug fin cdblu : "+detrmnt);

    i= iniI;
    j= iniJ;
    return det;
}
*/

determiner.onclick=function(){  
    /*if (upper) {
        detrmnt=upper[0][0];
        for (var c=1; c<n; ++c){
            detrmnt*=upper[c][c];
        }
        detrmnt = Math.round(detrmnt*10000)/10000;
        window.alert("determinant de A : " + detrmnt);
        if ((detrmnt != 0) && (detrmnt != null)){
            inverser.disabled=false;
        }
    } else {
        window.alert("Le déterminant doit être calculé dans LU");
    }*/
    /*var mamat;
    mamat = new Array(n);
    for (var i = 0; i < n; ++i){
        mamat[i] = new Array(n);
    }
    
    for (var i=0;i<n;i++){
        for (var j=0;j<n;j++){
            mamat[i][j]=document.getElementById(i+","+j).value;
        }
    }
    
    detrmnt=calcDet(mamat,n);
    detrmnt = Math.round(detrmnt*10000)/10000;*/
    detrmnt=déterminerledéterminant()
    window.alert("determinant de A : " + detrmnt);
    if ((detrmnt != 0) && (detrmnt != null)){
        inverser.disabled=false;
    }
}
var facteurs;
inverser.onclick = function () {
    facteurs=new Array(n);
    for (var i=0;i<n;i++){
        facteurs[i]=new Array(n);
        for (var j=0;j<n;j++){
            facteurs[i][j]=0;
        }
    }
    if (detrmnt == 0) {
        window.alert("determinant de A nul : matrice non inversible");
    } else if ((detrmnt == null) || (isNaN(detrmnt))) {
        window.alert("veuillez d'abord calculer le determinant");
    } else {
        window.alert("La matrice est inversible. Déterminant : "+detrmnt);
        /*var l=0, k=0;
        while (l < ordre.value && k < ordre.value) {
            profil = [];
            var lig = l;
            var notfound = true;
            // recherche
            while (notfound && lig < ordre.value) {
                if (m[lig][k] != 0) {
                    profil.push(lig);
                    notfound = false;
                }
                lig++;
            }


            if (!notfound) {
                if (profil[0] != l) {
                    for (i = 0; i < ordre.value; i++) {
                        // echange de ligne
                        lignetemporaire[i] = m[profil[0]][i];
                        m[profil[0]][i] = m[l][i];
                        m[l][i] = lignetemporaire[i];
                    }
                }

                // normalisation



                for (i = l + 1; i < n; i++) {

                    var facteur = m[i][k] / m[l][k];
                    m[i][k] = 0;
                    for (j = k + 1; j < n; j++) {
                        m[i][j] -= facteur * m[l][j];
                    }
                    b[i] -= facteur * b[l];
                }
                facteurs[l].push(facteur);
                

                l++;


            }
            k++;
        }*/
    }

}




document.getElementById("comparaison").onclick=function(){
    
        var size=document.getElementById("size").value;
        var temps=new Array(size);
        var temps2=new Array(size);
        var labels=new Array(size);
        m=new Array(size*10);
        for (var j=0;j<size*10;j++){
            m[j]=new Array(size*10);
        }
        b=new Array(size*10);
        x=new Array(size*10);
        y=new Array(size*10);
  
        for (var i=1;i<=size;i++){

            start=new Date();

            n=i*10;
            labels[i-1]=String(n);
            
    
            
    
            randomSymetric(n);
    
            transfoLU();
            solutionIterativeY();
            solutionIterativeX();

            end=new Date();
            temps[i-1]=(end.getTime()-start.getTime());
        }
        for (var i=1;i<=size;i++){
            
            start=new Date();

            n=i*10;
           
    
            
    
            randomSymetric(n);
    
            factoCholesky();
            solutionCholesky();
            end=new Date();
            temps2[i-1]=(end.getTime()-start.getTime());
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
                },
                {
                 data:temps2,
                 label:"Cholesky",
                 borderColor:"blue"   
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
        for (var i=0;i<nb;i++){
            for (var j=0;j<nb;j++){
                m[i][j]=0;
                for (var k=0;k<nb;k++){
                    m[i][j]+=r[i][k]*r[k][j];
                }
            }
        }
    }

    