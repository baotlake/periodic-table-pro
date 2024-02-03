
copy project.config2.json project.config.json

set ENV_SUFFIX=.chem

call npm run build:weapp

ren dist dist_2

copy project.config1.json project.config.json

set ENV_SUFFIX=