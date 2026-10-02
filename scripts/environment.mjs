import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { spawnSync, spawn } from 'node:child_process';
import { resolve } from 'node:path';
const mode = process.argv[2];
const file = '.runtime/environments.json';
if (mode === 'setup') {
  mkdirSync('.runtime', {recursive:true});
  if (!existsSync(file)) writeFileSync(file, JSON.stringify(Object.fromEntries(['local','staging'].map((name,i)=>[name,{baseUrl:`http://localhost:${3101+i}`,port:3101+i,token:randomBytes(24).toString('hex'),databaseUrl:'file:'+resolve(`.runtime/${name}.db`)}])),null,2),{mode:0o600});
  for (const [name, cfg] of Object.entries(JSON.parse(readFileSync(file,'utf8')))) {
    const env={...process.env,DATABASE_URL:cfg.databaseUrl};
    for(const args of [['prisma','db','push','--schema','prisma/environment.prisma'],['prisma','db','seed']]) {
      const r=spawnSync('npx',args,{env,stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);
    }
    console.log(`${name} database ready; credentials are in ignored ${file}`);
  }
} else {
  if(!existsSync(file))throw new Error('Run npm run setup first');
  const cfg=JSON.parse(readFileSync(file,'utf8'))[mode];if(!cfg)throw new Error('Unknown environment');
  const child=spawn('npx',['ts-node','src/index.ts'],{env:{...process.env,DATABASE_URL:cfg.databaseUrl,API_TOKEN:cfg.token,PORT:String(cfg.port),APP_ENV:mode},stdio:'inherit'});
  for(const sig of ['SIGINT','SIGTERM'])process.on(sig,()=>child.kill(sig));
  child.on('exit',code=>process.exit(code||0));
}
