d:
cd MongoDB\Server\3.6\bin

mongod --config D:\MongoDB\shard11\shard11.conf  --serviceName "shard11" --serviceDisplayName "shard11" --install
mongod --config D:\MongoDB\shard12\shard12.conf  --serviceName "shard12" --serviceDisplayName "shard12" --install
mongod --config D:\MongoDB\shard13\shard13.conf  --serviceName "shard13" --serviceDisplayName "shard13" --install

mongod --config D:\MongoDB\shard21\shard21.conf  --serviceName "shard21" --serviceDisplayName "shard21" --install
mongod --config D:\MongoDB\shard22\shard22.conf  --serviceName "shard22" --serviceDisplayName "shard22" --install
mongod --config D:\MongoDB\shard23\shard23.conf  --serviceName "shard23" --serviceDisplayName "shard23" --install

mongod --config D:\MongoDB\config\config.conf  --serviceName "config" --serviceDisplayName "servesconfig" --install

mongos --config D:\MongoDB\route\route.conf  --serviceName "route" --serviceDisplayName "serveroute" --install



pause
