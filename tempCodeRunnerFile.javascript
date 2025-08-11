function Authenticator() {
  this._key = 'passport';
  this._strategies = {};
  this._serializers = [];
  this._deserializers = [];
  this._infoTransformers = [];
  this._framework = null;
  this._userProperty = 'user';
  
  // this.init();
  // return this
}

Authenticator.prototype.print = function(){console.log('print successful')}
const auth = new Authenticator()
console.log(auth.print())