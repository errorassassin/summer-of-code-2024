import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:grocery_pos/components/custom_theme.dart';
import 'package:grocery_pos/pages/welcome/welcome_page.dart';
import 'package:grocery_pos/pages/login/login_page.dart';
import 'package:grocery_pos/pages/register/register_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      theme: CustomTheme.theme,
      routerConfig: GoRouter(
        initialLocation: '/',
        routes: [
          GoRoute(
            path: '/',
            builder: (context, state) => const WelcomePage(),
          ),
          GoRoute(
            path: '/login',
            builder: (context, state) => const LoginPage(),
          ),
          GoRoute(
            path: '/register',
            builder: (context, state) => const RegisterPage(),
          ),
        ],
      ),
    );
  }
}
