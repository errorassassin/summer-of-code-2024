import 'package:flutter/material.dart';

class CustomButton2 extends StatelessWidget {
  const CustomButton2({
    super.key,
    required this.onPressed,
    required this.text,
    this.style,
  });

  final VoidCallback onPressed;
  final String text;
  final TextStyle? style;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.black,
        borderRadius:
            BorderRadius.circular(15.0), // Adjust to fit the button's size
      ),
      child: Material(
        color: Colors.transparent, // Transparent color to show the gradient
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(32.0),
          child: Container(
            padding: const EdgeInsets.all(14),
            alignment: Alignment.center,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    text,
                    textAlign: TextAlign.center,
                    style: style,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
