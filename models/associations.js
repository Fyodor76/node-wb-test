import { User } from './user.js';
import { GroupProduct } from './groupProduct.js';
import { Product } from './product.js';
import { Recommendation } from './recommendation.js';
import { OrderItem } from './orderItem.js';
import { Category } from './categories.js';
import { Order } from './orders.js';
import { CartItem } from './cartItems.js';
import { Comment } from './comments.js';

User.hasMany(Recommendation, { foreignKey: 'userId' });
Recommendation.belongsTo(User, { foreignKey: 'userId' });

// Category -> Recommendation
Category.hasMany(Recommendation, { foreignKey: 'categoryId' });
Recommendation.belongsTo(Category, { foreignKey: 'categoryId' });

// GroupProduct -> Recommendation
GroupProduct.hasMany(Recommendation, { foreignKey: 'groupProductId' });
Recommendation.belongsTo(GroupProduct, { foreignKey: 'groupProductId' });

// Category -> GroupProduct
Category.hasMany(GroupProduct, { foreignKey: 'categoryId' });
GroupProduct.belongsTo(Category, { foreignKey: 'categoryId' });

// User -> Category (User recommendations)
User.belongsToMany(Category, { through: 'UserCategory', foreignKey: 'userId' });
Category.belongsToMany(User, { through: 'UserCategory', foreignKey: 'categoryId' });

// User -> GroupProduct (User recommendations)
User.belongsToMany(GroupProduct, { through: 'UserGroupProduct', foreignKey: 'userId' });
GroupProduct.belongsToMany(User, { through: 'UserGroupProduct', foreignKey: 'groupProductId' });

// GroupProduct -> Product
GroupProduct.hasMany(Product, { foreignKey: 'groupProductId' });
Product.belongsTo(GroupProduct, { foreignKey: 'groupProductId' });

// User -> Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order -> OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Product -> OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(Comment, { foreignKey: 'productId' });
Comment.belongsTo(Product, { foreignKey: 'productId' })

Comment.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Comment, { foreignKey: 'userId' });