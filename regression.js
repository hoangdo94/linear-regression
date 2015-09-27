function tMatrix(r){for(var t=r[0].length,n=[],a=0;t>a;a++){for(var f=[],e=0;e<r.length;e++)f.push(r[e][a])
n.push(f)}return n}function mulMatrix(r,t){if(r[0].length===t.length){for(var n=t[0].length,a=[],f=0;f<r.length;f++){for(var e=[],i=0;n>i;i++){for(var u=0,h=0;h<t.length;h++)u+=r[f][h]*t[h][i]
e.push(u)}a.push(e)}return a}}function iMatrix(r){if(r.length===r[0].length){var t=0,n=0,a=0,f=r.length,e=0,i=[],u=[]
for(t=0;f>t;t+=1)for(i[i.length]=[],u[u.length]=[],a=0;f>a;a+=1)t==a?i[t][a]=1:i[t][a]=0,u[t][a]=r[t][a]
for(t=0;f>t;t+=1){if(e=u[t][t],0==e){for(n=t+1;f>n;n+=1)if(0!=u[n][t]){for(a=0;f>a;a++)e=u[t][a],u[t][a]=u[n][a],u[n][a]=e,e=i[t][a],i[t][a]=i[n][a],i[n][a]=e
break}if(e=u[t][t],0==e)return}for(a=0;f>a;a++)u[t][a]=u[t][a]/e,i[t][a]=i[t][a]/e
for(n=0;f>n;n++)if(n!=t)for(e=u[n][t],a=0;f>a;a++)u[n][a]-=e*u[t][a],i[n][a]-=e*i[t][a]}return i}}function linearRegression(r,t){for(var n=[],a=[],f=r[0].length,e=0;e<r.length;e++){for(var i=[1],u=0;f-1>u;u++)i.push(r[e][u])
n.push(i),a.push([r[e][f-1]])}try{var h=mulMatrix(tMatrix(n),n),o=iMatrix(h),l=mulMatrix(tMatrix(n),a),g=mulMatrix(o,l)
t=t||3
var M=Math.pow(10,t)
return tMatrix(g)[0].map(function(r){return Math.round(r*M)/M})}catch(v){return null}}