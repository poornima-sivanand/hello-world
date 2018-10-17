const log4js = require('log4js');
const fs = require('fs');

log4js.configure({
  appenders: {
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' }
  }
});

const cli = require('oc-cli-wrapper')
const oc=cli({'options':{'namespace':'csnr-devops-lab-tools'}});

const buildConfigs=[{
  'filename':'.pipeline/_python36.bc.json',
  'param':[
    'NAME=hello',
    'SUFFIX=-prod',
    'VERSION=1.0.0',
    'SOURCE_BASE_CONTEXT_DIR=app-base',
    'SOURCE_CONTEXT_DIR=app',
    'SOURCE_REPOSITORY_URL=https://github.com/cvarjao-o/hello-world.git',
    'SOURCE_REPOSITORY_REF=master'
  ]
}]

//Process Template(s) and create a single List of resources
oc.process(buildConfigs)
.then(result =>{
  //Apply best practices, validate, and apply standard labels/annotaions
  return oc.prepare(result)
})
.then((result)=>{
  //Apply the configurations for creating or updating resources
  return oc.apply({'filename':result});
})
.then(result => {
  //Build all BuildConfig that needs to be done
  return oc.startBuilds(result)
})
.then((result)=>{
  //Collect some of the resources (bc,build,istag,isimage + build logs) used or produced during build, and save them to disk
  //Maybe archive/publish somewhere elase
  oc.saveBuildArtifactsToDir(result, './output')
  return result
})
