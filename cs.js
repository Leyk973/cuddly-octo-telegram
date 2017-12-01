
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
var inputs=document.getElementsByClassName("mat");
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

        //Quand on laisse une case vide, la valeur 0 lui est attribuée
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
    l=0;
    k=0;
    for (i=0;i<n;i++){
        for (j=0;j<n;j++){
            m[i][j]=document.getElementById(i+","+j).value;
        }
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
                console.log(facteur);
                for (j=k;j<n;j++){
                    m[i][j]-=facteur*m[l][j];
                }
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
    console.log(m);

    
}



random.onclick=function(){
    for (i=0;i<inputs.length;i++){
        inputs[i].value=Math.round((Math.random()-0.5)*20);
    }
}


