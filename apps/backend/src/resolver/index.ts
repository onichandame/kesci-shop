import 'reflect-metadata'
import {
  PubSubEngine,
  Root,
  PubSub,
  Subscription,
  Query,
  Args,
  ArgsType,
  Resolver,
  Field,
  ObjectType,
  buildSchemaSync,
} from 'type-graphql'
import { greet } from '../service'

const friends: string[] = []

@ObjectType()
class Greeting {
  @Field(() => Date)
  timestamp!: Date
  @Field(() => String)
  message!: string
}

@ArgsType()
class GreetArgs {
  @Field(() => String, { nullable: true })
  name?: string
}

@Resolver(Greeting)
class TestResolver {
  @Query(() => Greeting)
  greet(@Args() { name }: GreetArgs, @PubSub() pubSub: PubSubEngine): Greeting {
    const n = name || 'bro'
    if (friends.indexOf(n) < 0) {
      friends.push(n)
      setInterval(() => {
        pubSub.publish(n, n)
      }, 1000)
    }
    return greet(n)
  }

  @Subscription({ topics: ({ args }) => args.name || `bro` })
  chat(@Args() {}: GreetArgs, @Root() n: string): Greeting {
    return greet(n)
  }
}

export const schema = buildSchemaSync({
  resolvers: [TestResolver],
  validate: false,
})
