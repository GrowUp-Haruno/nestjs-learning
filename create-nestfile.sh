basename=$1
yarn nest g module $basename --no-spec && yarn nest g controller $basename --no-spec && yarn nest g service $basename --no-spec