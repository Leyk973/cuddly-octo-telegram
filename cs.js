
var ordre=document.getElementById("ordre");
var ok=document.getElementById("okbutton");
var matrice=document.getElementById("matrice");
var string="";
var str2="";
var echelon=document.getElementById("echelon");
var possible=false;
var n=0;
var m;
var b;
var profil=[];
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
        n=ordre.value;
        string="<tr><th colspan="+n+">A</th><th>b</th></tr>";
        
       
        
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
            var str="";
            for (i=0;i<n;i++){
                str+="<tr>";
                for (j=0;j<n;j++){
                    str+="<td><label id='l"+i+","+j+"'>ah</label></td>";
                    
                }
                str+="</tr>";
            }

            str="";
            for (i=0;i<n;i++){
                str+="<tr>";
                for (j=0;j<n;j++){
                    str+="<td><label id='l"+i+","+j+"'>ah</label></td>";
                    
                }
                str+="</tr>";
            }
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
