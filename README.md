#  **Sword ⚔**


## The pluggable 🔌 ecs (entity component system)📦 to rule them all!

# Features
***Simple api 📚***: Perfect, even for starters <br>
***Scalable 😎***: Best game architecture
<br>
***Typescript ready🔒***: support for typescript
<br>
***Pluggable 🔌***: create plugins to add ecs to all possible libraries

## Example

````
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
}

class Rotation extends Behaviour {
  constructor(){
    super('rotation')
  }

  update(gameObject: GameObject, _delta: number): void {
    gameObject.binded.rotation.y += 0.01;
  }
}

let actor = new Actor({})
let scene = new GameScene({});

actor.addBehaviour(new ThreeRenderComponent());
scene.addPlugin({three: new SceneAdderComponent({})});

actor.addBehaviour(new Rotation());

function animate() {

  let delta = requestAnimationFrame(animate)

  scene.update(delta);
}

animate()

````

## why?

there is no why. Just joking, Game development is not easy... this library from sword ecosystem might help you 'fastify' the game creation process

# License

Yes guys, it's MIT licensed


