/**
 * 
 * express+nodejs+mysql+mongodb
 * 
 * 
 * 
 */

/**
 * 
 * 用户输入要连接的mysql数据库，
 * 后台拉取数据：
 *      数据表 table
 *          show tables;
 *      每个数据表中的列信息 columns
 *          SHOW FULL COLUMNS FROM TABLE_NAME;
 *      每个数据表的外键表信息 foreign
 *          select
 *              TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
 *          from INFORMATION_SCHEMA.KEY_COLUMN_USAGE
 *          where CONSTRAINT_SCHEMA =Database_Name AND
 *          REFERENCED_TABLE_NAME = REFERENCED_TABLE_NAME;
 * 提示数据拉取完毕，展示下一阶段界面 
 * 
 * 
 * 
 * 
 *  
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */



/**
 * 
 * 存储结构
 * 
 * //mysql查询到的数据库结构相关数据
 * db_data={
 *     
 *         tb1:{
 *              col_list:{
 *                  cid:{
 *                      type:char(13),
 *                      f_flag:null or object //如果不是null则说明该列为外键
 *                  },
 *                  cn:{
 *                      type:char(13),
 *                      f_flag:null or object //如果不是null则说明该列为外键
 *                  }
 *                  
 *              }
 *                 
 *         }
 *         
 *     ,
 *     tb2:{
 *              col_list:{
 *                  cid:{
 *                          type:char(13),
 *                          f_flag:null or object //如果不是null则说明该列为外键
 *                      },
 *                      cn:{
 *                          type:char(13),
 *                          f_flag:null or object //如果不是null则说明该列为外键
 *                      }
 *                  
 *                  }
 *              }
 *         }
 * };
 * 
 * //用户选择结果相关数据
 * result_data=[
 *      {
 *          w_name:work1,//==collection1
 *          msg:{
 *              description:"xxxxxx",
 *              table_list:{
 *                  table1:[
 *                          col1,
 *                          col2
 *                      ],
 *                  table2:[
 *                          col3,
 *                          col4
 *                      ]
 *              }
 *          },
 *          index:col1//索引
 *      },
 *      {
 *          w_name:work2,
 *          msg:{
 *              description:"2xxxxxx",
 *              table_list:[
 *                  {
 *                      table_name:table3,
 *                      col_list:[
 *                          col31,
 *                          col32
 *                      ]
 *                  },
 *                  {
 *                      table_name:table4,
 *                      col_list:[
 *                          col43,
 *                          col44
 *                      ]
 *                  }
 *              ]
 *          }，
 *          index:col1//索引
 *      }
 * ]
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


// var data = [{
//         n: tb1,
//         c_list: []
//     },
//     {
//         n: tb2,
//         c_list: []
//     }
// ];

// var result;
// data.forEach((item) => {
//     if (item.n == "tb2") {
//         result = item;
//         return;
//     }
// });

// var data = {
//     tb1: {
//         c_list: []
//     },
//     tb2: {
//         c_list: []
//     }
// }

// var result;
// result = data["tb2"];



/**
 * 
 * 自动生成数据库迁移计划：
 * 
 * 
 * 实例：
 * 
 * 一对多：
 * 
 * One-to-Few（一对有限数量的多）：
 *          Person和Address，
 *          一个Person基本只有少数量的居住地址，
 *          并且在很大程度上，没有单独读取Address对象的需求，
 *          
 *          mysql：
 *              table       person         address            person-address
 *                          p_id            a_id                  pa_id
 *                          name            street                a_id
 *                                          city                  p_id
 *                                          country
 *                          
 *          mongodb:
 *              根据需求，没有单独读取Address对象的需求，也就是说是否有必要单独建立一个adress的表格
 *              collection   person
 *                            _id(mongodb默认主键)
 *                            name
 *                            addresses:[
 *                                  {street,city,country}
 *                              ]
 * 
 * 
 * 
 * One-to-Many（一对千量级的多）:
 *          Product（产品）和Part（配件），
 *          一个产品，例如汽车，可以有数百个配件，而且配件通用性，也导致有需求单独对于配件进行查询，
 *          
 *          mysql：
 *              table       product         part              product-part
 *                          pro_id          par_id              pp_id
 *                          name            name                pro_id
 *                          manufacturer    qty                 par_id
 *                                          cost                
 *                                          price
 *                          
 *          mongodb:
 *              collection      product                                     part
 *                              _id                                         _id
 *                              name                                        name
 *                              manufacturer                                qty
 *                              parts:[                                     cost
 *                                  {id(part表中的_id),name}                 price
 *                              ]                                           
 * 
 * 
 * 
 * One-to-Squillions（一对无数）:
 *          例如分布式系统的日志，每个机器（Host）会产生大量的日志记录（record）,
 *          也就是说，引用数组的长度无法控制，很可能越界
 * 
 * 
 *          mysql：
 *              table       host            record              host-record
 *                          h_id            r_id                hr_id
 *                          name            time                h_id
 *                          ipaddr          msg                 r_id
 *                                          
 *                                          
 *                          
 *          mongodb:
 *              collection      host                                        part
 *                              _id                                         _id
 *                              name                                        time
 *                              ipaddr                                      host(host中_id)
 *                                                                          msg
 * 
 * 
 * 
 * Many-to-Many（多对多）:
 *          Person和Group
 * 
 *                                                 
 *          mysql：
 *              table       person          group               person-group
 *                          p_id            g_id                pg_id
 *                          f_name          name                p_id
 *                          l_name                              g_id
 *                                          
 *                                          
 *                          
 *          mongodb:
 *              collection      person                                       group
 *                              _id                                          _id
 *                              f_name                                       name
 *                              l_name                                       persons:[
 *                              groups:[                                        {id(person中的_id)}
 *                                  {id(group中的_id)}                       ]
 *                              ]                                      
 *                                                                         
 *                               
 * 
 * 
 * 
 * 
 * 
 * 转换算法：
 *      通过关系表，找到外键，遍历外键：
 *              创建collection,
 *              通过其他外键(f_name)找到相应外键表获取外键表中列名(col_List)，
 *              在collection中添加一条属性命名为f_name，存储内容数据类型为对象组成的数组,
 *              将col_List中列名取出，都作为f_name这条属性存储内容里面对象的属性名
 *      
 *      
 *     以person  group例子来转换：
 *          
 *          mongodb:
 *              collection      person                                       group
 *                              _id                                          _id
 *                              f_name                                       name
 *                              l_name                                       persons:[
 *                              groups:[                                        {
 *                                  {                                               id(person中的_id)
 *                                      id(group中的_id)                            f_name
 *                                      name                                        l_name
 *                                  }                                           }
 *                              ]                                            ]
 *                        
 *         
 *          将结果呈现给用户，因为用户需求各样，最终需要的mongodb结构也不一样，
 *          所以让用户自行编辑。可做属性的增删
 * 
 * 
 * 
 * 
 */