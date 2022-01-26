const sequelize = require('../db');

// импорт класса DataTypes из sequelize.
// нужен для описания типов данных
const {DataTypes} = require('sequelize');

/**
 * поля с внешними связями (device_id, user_id, basket_id) здесь не создаём,
 * опишем в связях
 */

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
});

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

const BasketDevice = sequelize.define('basket_device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

const Device = sequelize.define('device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    img: {
        type:DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

const DeviceInfo = sequelize.define('device_info', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Rating = sequelize.define('rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const Type = sequelize.define('type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
});

const Brand = sequelize.define('brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
});

/**
 * промежуточная модель для связи "многие-к-многим"
 * между моделями Type и Brand.
 * 
 * поле - только id, остальные поля Sequelize создаст сам при связывании
 * 
 */

const TypeBrand = sequelize.define('type_brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
})

// связи между моделями:

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

Type.hasMany(Device);
Device.belongsTo(Type);

// связь многие-к-многим. TypeBrand - связующая модель
Type.belongsToMany(Brand, {
    through: TypeBrand
});
Brand.belongsToMany(Type, {
    through: TypeBrand
});
// ----

Brand.hasMany(Device);
Device.belongsTo(Brand);

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    Rating,
    Type,
    Brand,
    TypeBrand
}