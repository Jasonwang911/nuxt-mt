import Router from 'koa-router';
import Menu from '../dbs/models/menu';
import Province from '../dbs/models/province';
import axios from 'axios';

let router = new Router({
  prefix: '/geo'
})

// 获取定位
router.get('/getPosition', (ctx) => {
  // let {status, data: {province, city}} = await axios.get('http://http://cp-tools.cn/')
  let {status, data: {province, city}} = {status: 200, data: {province: '海南省', city: '三亚市'}};
  if(status === 200) {
    ctx.body = {
      code: 0,
      province,
      city
    }
  }else {
    ctx.body = {
      code: -1,
      province: '',
      city: '',
      msg: '定位失败'
    }
  }
})

//菜单接口
router.get('/menu', async (ctx) => {
  const result = await Menu.findOne();
  ctx.body = {
    code: 0,
    menu: result.menu
  }
})

// 获取省份接口
router.get('/province', async (ctx) => {
  let province = await Province.find();
  ctx.body = {
    code: 0,
    province: province.map( item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

// 根据id获取对应城市
router.get('/province/:id', async (ctx) => {
  let city = await Province.findOne({id: ctx.params.id});
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return {province: item.province, id: item.id, name: item.name}
    })
  }
})

export default router;
