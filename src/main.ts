import * as THREE from 'three'

export class Behaviour {
  isBehaviour = true;
  name: string;

  constructor(name: string){
    this.name = name ?? 'behaviour'
  }

  onAwake(gameObject: GameObject) : void{
  }
  onDestroy(gameObject: GameObject) : void{
  }
  update(gameObject: GameObject, _delta: number) : void{
  }
}

export class GameObject {

  isGameObj = true;
  name: any
  children : GameObject[];
  binded: any;
  components: Array<Behaviour>

  constructor({name, binded} : any){

    this.name = name ?? 'gameObject'
    this.children = [];
    this.binded = binded ?? {};
    this.components = []

  }

  addChild(child: GameObject){
    this.children.push(child)
  }

  removeChild(child: GameObject){
    this.children.splice(this.children.indexOf(child), 1)
  }

  step(_delta: number){

    this.components.forEach((component) => {
      component.update(this, _delta)
    })

  }
}

export class Actor extends GameObject {

  tags: Set<string>
  isActor = true;

  constructor({name, binded, tags}: any){
    super({name, binded})
    this.tags = tags;
  }

  addBehaviour(behaviour: Behaviour){
    this.components.push(behaviour);
    behaviour.onAwake(this);
  }

  removeBehaviour(name: string){
    let index = this.components.findIndex(e => e.name === name)
    this.components.splice(index , 1)
  }

  getBehaviour<T>(name: string){
    return this.components.find((e) => e.name = name) as T;
  }

  destroy(){
    let i = this.components.length;
    while(i--) this.components[i].onDestroy(this);
  }

}

export class GameScene extends GameObject {

  isGameScene = true;
  children: Actor[];
  plugins : Behaviour[]

  constructor({name, binded}: any){
    super({name, binded});
    this.plugins = []
    this.children = []
  }

  update(_delta: number){
    for(let child of this.children){
      child.step(_delta)
    }

    this.step(_delta);
  }

  addPlugin(options: {[key: string] : Behaviour} = {}){
    setTimeout(() => this.children.forEach((child) => { this.plugins.forEach((value) => { child.addBehaviour(value)})}))
    console.log('plugin added to:', this.children)
    Object.entries(options).forEach((opt) => this.plugins.push(opt[1]))
  }

  addChild(child: Actor): void {
    this.children.push(child)
  }

  getPlugin<T>(name: string){
    return this.plugins.find(e => e.name === name) as T
  }
}

export class ThreeRenderComponent extends Behaviour {

  object : any;

  constructor(object? : any){
    super('threeInstance')
    this.object = object ?? new THREE.Object3D();
  }

  onAwake(gameObject: GameObject){
    gameObject.binded = this.object;
  }

}

export class SceneAdderComponent extends Behaviour {

  scene : THREE.Scene;

  constructor({scene}: {scene: THREE.Scene} | any){
    super('scene-adder')
    this.scene = scene ?? new THREE.Scene();
  }

  onAwake(gameObject: GameObject): void {
    this.scene.add(gameObject.binded)
  }

  onDestroy(gameObject: GameObject): void {
    this.scene.remove(gameObject.binded)
  }
}

