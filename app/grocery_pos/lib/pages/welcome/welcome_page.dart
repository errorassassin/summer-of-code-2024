import 'package:flutter/material.dart';
import 'package:grocery_pos/components/custom_button1.dart';
import 'package:simple_shadow/simple_shadow.dart';
import 'package:go_router/go_router.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          _Circle1(),
          _Circle2(),
          SizedBox.expand(
            child: Column(
              children: [
                const SizedBox(height: 100),
                SimpleShadow(
                  opacity: 0.5,
                  color: const Color.fromARGB(255, 30, 30, 31),
                  offset: const Offset(8, 8),
                  sigma: 11,
                  child: Image.asset('assets/images/register.png'),
                ),
                const SizedBox(height: 5),
                Text('Welcome to Grocery PoS !',
                    style: Theme.of(context).textTheme.headlineLarge),
                const SizedBox(height: 19),
                Text(
                  'A centralized solution for inventory, sales\nand customer management.',
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                const Spacer(),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20.0),
                  child: CustomButton1(
                    onPressed: () {
                      context.push('/login');
                    },
                    text: 'LOGIN',
                    icon: const Icon(
                      Icons.login,
                      color: Colors.white,
                    ),
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: Colors.white,
                        ),
                  ),
                ),
                const SizedBox(height: 17),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20.0),
                  child: CustomButton1(
                    onPressed: () {
                      context.push('/register');
                    },
                    text: 'REGISTER',
                    icon: const Icon(
                      Icons.person_add,
                      color: Colors.white,
                    ),
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: Colors.white,
                        ),
                  ),
                ),
                const SizedBox(height: 69),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Circle1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: -140,
      left: 50,
      child: Container(
        width: 520,
        height: 520,
        decoration: const BoxDecoration(
          color: Color.fromARGB(255, 231, 81, 73),
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}

class _Circle2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 265,
      left: -200,
      child: Container(
        width: 300,
        height: 300,
        decoration: const BoxDecoration(
          color: Color(0xFFFF9C7B),
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
