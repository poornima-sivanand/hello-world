#!/usr/bin/env node
const oc = require('oc-cli-wrapper')

const parameters= process.argv.slice(2)
for (let j = 0; j < parameters.length; j++) {  
  console.log(j + ' -> ' + (parameters[j]));
}

//process.exit(1)

const cli=oc({'options':{'namespace':'csnr-devops-lab-tools'}});

const args2={
  'filename':'openshift/_python36.bc.json',
  'param':[
    'NAME=hello',
    'SUFFIX=-prod',
    'VERSION=1.0.0',
    'SOURCE_BASE_CONTEXT_DIR=app-base',
    'SOURCE_CONTEXT_DIR=app',
    'SOURCE_REPOSITORY_URL=https://github.com/cvarjao-o/hello-world.git'
  ]
}

cli.process(args2).then((result)=>{
  return cli.apply({'filename':result, 'dry-run':'true'});
}).then((result)=>{
  console.dir(result)
})
