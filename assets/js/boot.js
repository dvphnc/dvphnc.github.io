/* Boot screen — Tetris 'dvphnc' drop (retained from the original site). Dispatches 'bootDone' when finished. */
    (function(){
      const FONT={d:[[1,1,0],[1,0,1],[1,0,1],[1,0,1],[1,1,0]],v:[[1,0,1],[1,0,1],[1,0,1],[0,1,0],[0,1,0]],p:[[1,1,0],[1,0,1],[1,1,0],[1,0,0],[1,0,0]],h:[[1,0,1],[1,0,1],[1,1,1],[1,0,1],[1,0,1]],n:[[1,0,1],[1,1,1],[1,0,1],[1,0,1],[1,0,1]],c:[[0,1,1],[1,0,0],[1,0,0],[1,0,0],[0,1,1]]};
      const NAME=['d','v','p','h','n','c'],LW=3,GAP=1,NR=5,DR=2;
      const GC=NAME.length*(LW+GAP)-GAP,GR=DR+NR;
      const CF={};NAME.forEach((l,li)=>{const sc=li*(LW+GAP);for(let col=0;col<LW;col++){const c=sc+col;CF[c]=[];for(let r=0;r<NR;r++)if(FONT[l][r][col])CF[c].push(r);}});
      const FC=['filled','filled-alt','filled-deep','filled','filled-alt'];
      const board=document.getElementById('tetris-board');const cells=[];
      for(let r=0;r<GR;r++){cells[r]=[];for(let col=0;col<GC;col++){const el=document.createElement('div');el.className='t-cell';board.appendChild(el);cells[r][col]=el;}}
      let bootDone=false;
      function skipBoot(){
        if(bootDone)return;bootDone=true;
        var bs=document.getElementById('boot-screen');
        bs.classList.add('fade-out');
        setTimeout(function(){
          bs.style.display='none';
          document.dispatchEvent(new Event('bootDone'));
        },650);
      }
      window.skipBoot=skipBoot;
      function dropBlock(col,nr,fc){return new Promise(function(res){if(bootDone){res();return;}const tr=DR+nr;let cur=0;cells[cur][col].classList.add('drop-ghost');const iv=setInterval(function(){cells[cur][col].classList.remove('drop-ghost');cur++;if(cur<=tr)cells[cur][col].classList.add('drop-ghost');if(cur>tr){clearInterval(iv);const cell=cells[tr][col];cell.classList.add('land-flash');setTimeout(function(){cell.classList.remove('land-flash');cell.classList.add('filled',fc);res();},60);}},22);});}
      async function runAnimation(){let ci=0;await Promise.all(NAME.map(function(letter,li){return new Promise(async function(res){await new Promise(function(r){setTimeout(r,li*120);});if(bootDone){res();return;}const sc=li*(LW+GAP);await Promise.all([0,1,2].map(function(ci2){return (async function(){const col=sc+ci2;const rows=CF[col]||[];for(let k=0;k<rows.length;k++){if(bootDone)return;await dropBlock(col,rows[k],FC[ci++%FC.length]);await new Promise(function(r){setTimeout(r,28);});}})();}));res();});}));if(!bootDone){setTimeout(function(){document.getElementById('boot-tagline').classList.add('show');setTimeout(function(){if(!bootDone)skipBoot();},1200);},200);};}
      setTimeout(runAnimation,300);setTimeout(function(){if(!bootDone)skipBoot();},8000);
    })();
