import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomTheme {
  static ThemeData get theme {
    return ThemeData(
      scaffoldBackgroundColor: const Color(0xFFFFF6E9),
      textTheme: TextTheme(
        headlineLarge: GoogleFonts.dmSans(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          letterSpacing: -0.8,
        ),
        headlineSmall: GoogleFonts.dmSans(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          letterSpacing: -0.4,
          color: Colors.black54,
          height: 1.5,
        ),
        labelLarge: GoogleFonts.dmSans(
          fontSize: 17,
          fontWeight: FontWeight.bold,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: const Color(0xFFFFF6E9),
        titleTextStyle: TextStyle(
          color: const Color(0xFF604CC3),
          fontSize: 32,
          fontWeight: FontWeight.bold,
          fontFamily:
              GoogleFonts.poppins(fontWeight: FontWeight.bold).fontFamily,
        ),
        // toolbarHeight: 80,
        titleSpacing: 0,
      ),
    );
  }
}
